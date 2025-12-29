import { useEffect, useState, type FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useCreateExternalBookingMutation,
} from '@/redux/business/booking/bookingAPISlice'
import { useGetTableCategoryQuery } from '@/redux/business/category/categoryAPISlice'
import { useGetAllServiceNamesQuery } from '@/redux/business/service/serviceAPISlice'
import { useGetStaffQuery } from '@/redux/business/staff/staffAPISlice'

import { t } from 'i18next'

import { apiSlice } from '@/redux/APISlice'
import { useDispatch, useSelector } from 'react-redux'

import { SingleDatePickComponent } from '@/components/shared/DateTimePicker/SingleDetePicker'

import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SecondaryButton from '@/components/shared/buttons/SecondaryButton'

import TimePickerComponent from '@/components/shared/DateTimePicker/TimePicker/TimePickerComponent'
import PhoneInput from '@/components/shared/inputs/PhoneInput'
import TextInput from '@/components/shared/inputs/TextInput'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'

import createToast from '@/lib/createToast'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import dayjs from 'dayjs'
import type { TClickedBooking } from '@/pages/business/calendar'
import DropdownSelect from '@/components/shared/inputs/dropdownSelect'
import { Check, User, X } from 'lucide-react'
import {
  STATUS_BOOKING_EVENTS,
  transformToLocalDate,
} from '../schedulerCalendar/constants'
import { selectedBusinessProfileSelector } from '@/redux/auth/authSelectors'

interface IClient {
  firstName: string | null
  lastName: string | null
  phoneNumber: string | null
  email: string | null
}

export interface IAddBooking {
  startDate: dayjs.Dayjs
  note: string
  client: IClient | null
  staffId: string | undefined
  serviceIds: number | undefined
  tableCategoryId: number | null
  guestCount: number | null
}

interface IAddBookingModalProps {
  businessType: 1 | 2 | undefined
  isOpen: boolean
  setIsOpen: (isOpenStatus: boolean) => void
  addBookingDateFromCalendar?: React.RefObject<dayjs.Dayjs | null>
  clickedBooking?: TClickedBooking | null
  isMoreBookingsModalOpen?: boolean
  handleChangeIsMoreBookingsModalOpen?: (isOpenStatus: boolean) => void
}

const AddBookingModal: FunctionComponent<IAddBookingModalProps> = ({
  isOpen,
  setIsOpen,
  businessType,
  addBookingDateFromCalendar = null,
  clickedBooking,
  isMoreBookingsModalOpen,
  handleChangeIsMoreBookingsModalOpen,
}) => {
  const defaultSelectedServiceId = clickedBooking?.event?.services?.length
    ? clickedBooking?.event?.services[0].id
    : undefined
  const shouldHavePhoneNumber =
    clickedBooking?.event.isExternal || !clickedBooking?.event

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<IAddBooking>({
    defaultValues: {
      note: clickedBooking?.event?.notes ? clickedBooking?.event.notes : '',
      client: clickedBooking?.event?.client
        ? clickedBooking?.event.client
        : null,
      serviceIds: defaultSelectedServiceId,
      staffId: clickedBooking?.staff?.id || undefined,
      tableCategoryId: clickedBooking?.event?.tableCategoryId
        ? clickedBooking?.event?.tableCategoryId
        : null,
      guestCount: clickedBooking?.event?.guestCount
        ? clickedBooking?.event?.guestCount
        : null,
    },
  })
  const selectedBusinessProfile = useSelector(selectedBusinessProfileSelector)
  const isBarber = selectedBusinessProfile?.businessCategory.id === 2 // 2 === barber && 1 === restaurant

  const getDate = () => {
    if (clickedBooking?.event?.startDate)
      return transformToLocalDate(clickedBooking?.event?.startDate)
    if (addBookingDateFromCalendar?.current)
      return addBookingDateFromCalendar.current
    return dayjs()
  }

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(getDate)

  const pendingStatusEvent =
    clickedBooking?.event.status.id === STATUS_BOOKING_EVENTS.pending.id

  const { data: services = [] } = useGetAllServiceNamesQuery(undefined, {
    skip: !isBarber,
  })
  const [selectedService, setSelectedService] = useState<number>(
    defaultSelectedServiceId ? defaultSelectedServiceId : 0
  )

  const dispatch = useDispatch()

  const { data: staff = [] } = useGetStaffQuery(undefined, {
    skip: !selectedService || !isBarber,
  })

  const specificStaff = staff.filter((s) =>
    s.services.map((s) => s.id).includes(selectedService)
  )

  const { data: spaces = [] } = useGetTableCategoryQuery(undefined, {
    skip: isBarber,
  })
  const filteredSpaces = spaces.slice(1)

  const [
    confirmationMutation,
    { isLoading: isConfirmationLoading, isSuccess: isConfirmationSuccess },
  ] = useConfirmBookingMutation()
  const [
    cancelBookingMutation,
    { isLoading: isCancelLoading, isSuccess: isCancelBookingSuccess },
  ] = useCancelBookingMutation()

  const [createBooking] = useCreateExternalBookingMutation()


  useEffect(() => {
    setValue('startDate', selectedDate)
  }, [])

  useEffect(() => {
    const successSharedActions = () => {
      setIsOpen(false)
      if (
        isMoreBookingsModalOpen === true &&
        handleChangeIsMoreBookingsModalOpen
      ) {
        handleChangeIsMoreBookingsModalOpen(false)
      }
    }

    if (isConfirmationSuccess) {
      createToast.success(
        t('business.schedulerCalendar.confirmEvent.wasConfirmed')
      )
      successSharedActions()
    }
    if (isCancelBookingSuccess) {
      createToast.success(
        t('business.schedulerCalendar.cancelEvent.wasCanceled')
      )
      successSharedActions()
    }
  }, [isConfirmationSuccess, isCancelBookingSuccess])

  const formattedStaff = specificStaff.map((s) => ({
    id: s.id,
    value: s.id,
    label: `${s.firstName} ${s.lastName}`,
    url: s.file?.url,
  }))

  const handleBooking = async (data: IAddBooking) => {
    const formatted: IAddBooking = {
      ...data,
      client: {
        firstName: data.client?.firstName || null,
        lastName: data.client?.firstName || null,
        phoneNumber:
          data.client?.phoneNumber && shouldHavePhoneNumber
            ? `+995${data.client.phoneNumber}`.trim()
            : null,
        email: null,
      },
    }

    try {
      const result = await createBooking(formatted).unwrap()
      createToast.success(`${t('business.texts.order.success')}${result}`)
      dispatch(apiSlice.util.invalidateTags(['Bookings']))
      reset()
      setIsOpen(false)
    } catch {
      return
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="booking_modal bg-white max-w-[500px] w-full rounded-md py-8 px-6 flex flex-col gap-6">
        <DialogTitle className="booking_modal-header flex justify-between items-center">
          <span className="text-xl font-semibold">
            {t('business.addOrderModal.title')}
          </span>
        </DialogTitle>

        <form
          className="booking_modal-body flex flex-col gap-6"
          onSubmit={handleSubmit(handleBooking)}
        >
          <TextInput
            label={t('bookings.inputLabel.customerName')}
            placeholder="შეიყვანეთ მომხარებლის სახელი"
            disabled={pendingStatusEvent}
            {...register('client.firstName', {
              pattern: {
                value: /^[\p{L}\s'-]+$/u,
                message: t('bookings.formValidation.invalidCustomerName'),
              },
            })}
            error={errors.client?.firstName?.message}
          />
          {shouldHavePhoneNumber && (
            <PhoneInput
              label={t('bookings.inputLabel.mobileNumber')}
              disabled={pendingStatusEvent}
              placeholder="555 44..."
              {...register('client.phoneNumber', {
                pattern: {
                  value: /^(?:\s*\d\s*){9}$/,
                  message: t('bookings.formValidation.mobileNumber'),
                },
              })}
              error={errors.client?.phoneNumber?.message}
            />
          )}
          {businessType === 1 ? (
            <>
              <TextInput
                className="h-12!"
                disabled={pendingStatusEvent}
                label={t('bookings.inputLabel.customerCount')}
                placeholder={t('bookings.addBookingModal.enterCustomerCount')}
                {...register('guestCount', {
                  required: `${t(
                    'bookings.formValidation.required.customerCount'
                  )}`,
                  setValueAs: (v) => +v,
                })}
                error={errors.guestCount?.message}
              />

              <SelectDropDown
                className="h-12!"
                label={t('sidebar.link.spaces')}
                disabled={pendingStatusEvent}
                sentId
                options={filteredSpaces}
                {...register('tableCategoryId', {
                  required: `${t(
                    'bookings.formValidation.required.spaceCategory'
                  )}`,
                  setValueAs: (v) => +v,
                })}
                error={errors.tableCategoryId?.message}
              />
            </>
          ) : (
            <>
              <SelectDropDown
                className="h-12!"
                label={t('bookings.table.service')}
                options={services}
                disabled={pendingStatusEvent}
                placeholder={t('bookings.addBookingModal.selectService')}
                value={getValues('serviceIds')}
                sentId
                {...register('serviceIds', {
                  required: `${t('bookings.formValidation.required.service')}`,
                  setValueAs: (v) => (v ? [+v] : null),
                })}
                error={errors.serviceIds?.message}
                onChange={(e) => {
                  setSelectedService(+e.target.value)
                  setValue('serviceIds', +e.target.value)
                  setValue('staffId', undefined)
                }}
              />
              <DropdownSelect<string>
                withPictures
                className="bg-white min-w-[190px] text-[16px]! h-12!"
                valueClassName={'text-[16px]'}
                disabled={!selectedService || pendingStatusEvent}
                options={formattedStaff ?? []}
                value={getValues('staffId')}
                defaultIcon={<User />}
                placeholder={t('bookings.addBookingModal.selectStaffMember')}
                onChange={(id: string) => {
                  setValue('staffId', id)
                }}
              />
            </>
          )}
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: `${t('bookings.formValidation.required.dateAndTime')}`,
            }}
            render={({ field, fieldState }) => (
              <>
                <SingleDatePickComponent
                  date={selectedDate}
                  disabled={pendingStatusEvent}
                  onChange={(date) => {
                    if (!date || !selectedDate) {
                      setSelectedDate(date)
                      field.onChange(date)
                      return
                    }else{
                      const updatedDate = date
                      .hour(selectedDate.hour())
                      .minute(selectedDate.minute())
                      .second(0)
                      
                      setSelectedDate(updatedDate)
                      field.onChange(updatedDate)
                    }
                  }}
                  error={
                    fieldState.error?.message ? fieldState.error?.message : ''
                  }
                />

                <TimePickerComponent
                  defaultValue={`${selectedDate.format('HH:mm')}`}
                  disabled={pendingStatusEvent}
                  onChange={(time) => {
                    const [h, m] = time.split(':').map(Number)
                    const merged = selectedDate.hour(h).minute(m).second(0)
                    field.onChange(merged)
                  }}
                  error={
                    fieldState.error?.message ? fieldState.error?.message : ''
                  }
                />
              </>
            )}
          />

          <div className="booking_modal-footer flex gap-3">
            {pendingStatusEvent ? (
              <>
                <PrimaryButton
                  type="submit"
                  className="bg-[#E81C1C]"
                  loading={isCancelLoading}
                  handleClick={() => {
                    cancelBookingMutation({ orderId: clickedBooking.event.id })
                  }}
                >
                  {t('business.schedulerCalendar.cancelEvent')}
                  <X />
                </PrimaryButton>
                <PrimaryButton
                  type="submit"
                  className="bg-[#21C55D]"
                  loading={isConfirmationLoading}
                  handleClick={() => {
                    confirmationMutation({ orderId: clickedBooking.event.id })
                  }}
                >
                  {t('business.schedulerCalendar.confirmEvent')}
                  <Check />
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton onClick={() => setIsOpen(false)}>
                  {t('bookings.actionButtons.cancel')}
                </SecondaryButton>
                <PrimaryButton type="submit">
                  {t('bookings.actionButtons.save')}
                </PrimaryButton>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBookingModal
