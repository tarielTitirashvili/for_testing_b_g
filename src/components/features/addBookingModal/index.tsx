import { useEffect, useRef, useState, type FunctionComponent } from "react"
import { Controller, useForm } from "react-hook-form"

import { useCreateExternalBookingMutation } from "@/redux/business/booking/bookingAPISlice"
import { useGetTableCategoryQuery } from "@/redux/business/category/categoryAPISlice"
import { useGetAllServiceNamesQuery } from "@/redux/business/service/serviceAPISlice"
import { useGetStaffQuery } from "@/redux/business/staff/staffAPISlice"

import { X } from "lucide-react"

import { t } from "i18next"

import { apiSlice } from "@/redux/APISlice"
import { useDispatch } from "react-redux"

import { SingleDatePickComponent } from "@/components/shared/DateTimePicker/SingleDetePicker"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"

import TimePickerComponent from "@/components/shared/DateTimePicker/TimePicker/TimePickerComponent"
import PhoneInput from "@/components/shared/inputs/PhoneInput"
import TextInput from "@/components/shared/inputs/TextInput"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"

import createToast from "@/lib/createToast"

import dayjs from "dayjs"

interface IClient {
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    email: string | null
}

export interface IAddBooking {
    startDate: dayjs.Dayjs,
    note: string,
    client: IClient | null
    staffId: string | null
    serviceIds: number[] | null
    tableCategoryId: number | null
    guestCount: number | null
}

interface IAddBookingModalProps {
    businessType: 1 | 2 | undefined
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBookingModal: FunctionComponent<IAddBookingModalProps> = ({ isOpen, setIsOpen, businessType }) => {

    const { handleSubmit, register, control, formState: { errors }, reset } = useForm<IAddBooking>({
        defaultValues: {
            note: '',
            client: null,
            serviceIds: null,
            guestCount: null,
            tableCategoryId: null,
        }
    })

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs()) 

    const { data: services = [] } = useGetAllServiceNamesQuery()
    const [selectedService, setSelectedService] = useState<number>(0) 

    const dispatch = useDispatch()

    const { data: staff = [] } = useGetStaffQuery(undefined, { skip: !selectedService })
    const specificStaff = staff.filter(s => s.services.map(s => s.id).includes(selectedService))

    const { data: spaces = [] } = useGetTableCategoryQuery()

    const [createBooking] = useCreateExternalBookingMutation()
    

    const formattedStaff = specificStaff.map(s => ({
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
    }))

    const handleBooking = async (data: IAddBooking) => {
        const formatted: IAddBooking = {
            ...data,
            client: {
                firstName: data.client?.firstName || null,
                lastName: data.client?.firstName || null,
                phoneNumber: data.client?.phoneNumber ? `+995${data.client.phoneNumber}`.trim() : null,
                email: null,  
            }
        }

        const result = await createBooking(formatted).unwrap()
        createToast.success(`${t("business.texts.order.success")}${result}`)
        dispatch(apiSlice.util.invalidateTags(['Bookings']))
        reset()
        setIsOpen(false) 
    }

    const modalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            if (target.closest('.datepicker-dialog-content')) return
            
            if (target.closest('.timepicker-dialog-content')) return

            if (modalRef.current && modalRef.current.contains(target)) return

            setIsOpen(false)
        }
        
        if (isOpen) document.addEventListener('mousedown', handleOutsideClick)
        
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }

    }, [isOpen, setIsOpen])

    return (
        <div className={`booking_modal-wrapper fixed inset-0 bg-black/60 flex justify-center items-center z-10 transition ${!isOpen && 'opacity-0 bg-clip-content z-[-90]'}`}>
            <div ref={modalRef} className="booking_modal bg-white max-w-[500px] w-full rounded-md py-8 px-6 flex flex-col gap-6">
                <div className="booking_modal-header flex justify-between items-center">
                    <span className="text-xl font-semibold">
                        {t("business.addOrderModal.title")}
                    </span>
                    <X onClick={() => setIsOpen(false)} size={17} className="cursor-pointer" />
                </div>

                <form
                    className="booking_modal-body flex flex-col gap-6"
                    onSubmit={handleSubmit(handleBooking)}
                >
                    <TextInput
                        label={t("bookings.inputLabel.customerName")}
                        placeholder="შეიყვანეთ მომხარებლის სახელი"
                        {...register('client.firstName', {
                            pattern: {
                                value: /^[\p{L}\s'-]+$/u,
                                message: t("bookings.formValidation.invalidCustomerName")
                            }
                        })}
                        error={errors.client?.firstName?.message}
                    />

                    <PhoneInput
                        label={t("bookings.inputLabel.mobileNumber")}
                        placeholder="555 44..."
                        {...register('client.phoneNumber', {
                            pattern: {
                                value: /^(?:\s*\d\s*){9}$/, 
                                message: t("bookings.formValidation.mobileNumber")
                            }
                        })}
                        error={errors.client?.phoneNumber?.message}
                    />

                    {businessType === 1 ? (
                        <>
                            <TextInput
                                label={t("bookings.inputLabel.customerCount")}
                                placeholder="შეიყვანეთ მომხმარებლის რაოდენობა"
                                {...register('guestCount', {
                                    required: `${t("bookings.formValidation.required.customerCount")}`,
                                    setValueAs: v => +v
                                })}
                                error={errors.guestCount?.message}
                            />

                            <SelectDropDown
                                label={t("sidebar.link.spaces")}
                                sentId
                                options={spaces}
                                {...register('tableCategoryId', {
                                    required: `${t("bookings.formValidation.required.spaceCateogry")}`,
                                    setValueAs: v => +v
                                })}
                                error={errors.tableCategoryId?.message}
                            />
                        </>
                    ) : (
                        <>
                            <SelectDropDown
                                label={t("bookings.table.service")}
                                options={services}
                                sentId
                                {...register('serviceIds', {
                                    required: `${t("bookings.formValidation.required.service")}`,
                                    setValueAs: v => v ? [+v] : null 
                                })}
                                error={errors.serviceIds?.message}
                                onChange={(e) => setSelectedService(+e.target.value)}
                            />

                            <SelectDropDown
                                label={t("bookings.inputLabel.specialist")}
                                sentId
                                disabled={!selectedService}
                                className={`${!selectedService && 'opacity-50'}`}
                                options={formattedStaff}
                                {...register('staffId', {
                                    required: `${t("bookings.formValidation.required.specialist")}`
                                })}
                                error={errors.staffId?.message}
                            />
                        </>
                    )}

                    <Controller
                        name='startDate'
                        control={control}
                        rules={{
                            required: `${t("bookings.formValidation.required.dateAndTime")}`,
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <SingleDatePickComponent
                                    date={selectedDate}
                                    onChange={(date) => {
                                        setSelectedDate(date)
                                        field.onChange(date)
                                    }}
                                    error={fieldState.error?.message ? fieldState.error?.message : ''}
                                />

                                <TimePickerComponent
                                    onChange={(time) => {
                                        const [h, m] = time.split(":").map(Number)
                                        const merged = selectedDate.hour(h).minute(m).second(0)
                                        field.onChange(merged)
                                    }}
                                    error={fieldState.error?.message ? fieldState.error?.message : ''}
                                />
                            </>
                        )}
                    />

                    <div className="booking_modal-footer flex gap-3">
                        <SecondaryButton onClick={() => setIsOpen(false)}>
                            {t("bookings.actionButtons.cancel")}
                        </SecondaryButton>
                        <PrimaryButton type="submit">
                            {t("bookings.actionButtons.save")}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBookingModal