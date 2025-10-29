import { useEffect, useState, type FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'

import BookingHours from '@/components/features/bookingHours'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import FileUploader from '@/components/shared/fileUploader'

import { useTranslation } from 'react-i18next'

import BusinessProfileForm from './components/BusinessProfileForm'
import {
  useGetBusinessProfileQuery,
  useUploadFileMutation,
  useEditBusinessProfileMutation,
} from '@/redux/business/businessProfile/businessProfileAPISlice'
// import { useGetRegionsQuery } from '@/redux/business/staticAPISlice/staticAPISlice'
import type { HalfHourTimeIntervals } from '@/components/utils/halfHourIntervalsGenerator'
import Loader from '@/components/shared/loader'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export type TBusinessBookingTime = {
  bookingStartTime: HalfHourTimeIntervals
  bookingEndTime: HalfHourTimeIntervals
  name: string
  isActive: boolean
  id: number
}

export interface IBusinessAddress {
  locales: {
    name: string
    languageId: number
  }[]
  latitude: number
  longitude: number
}

export type TFile = {
  id: number
  isProfile: boolean
  url?: string
}
export interface IBusinessFormData {
  name: string
  description: string
  webSite: string
  tikTok: string
  instagram: string
  facebook: string
  orderReminder: number
  preOrder: number
  regionId: number
  districtId: number
  businessAddress: IBusinessAddress
  businessBookingTime: TBusinessBookingTime[]
  files: TFile[]
  region: { id: number; name: string }
  district: { id: number; name: string }
}

const BusinessProfile: FunctionComponent = () => {
  const [isExpand, setIsExpand] = useState<string | null>('')

  const [fileUploaderErrors, setFileUploaderErrors] = useState<string | null>(
    null
  )
  const [regionId, setRegionId] = useState<number | null>(null)
  
  const [images, setImages] = useState<string[]>([])

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset,
  } = useForm<IBusinessFormData>({
    mode: "onChange",
    defaultValues: {
      preOrder: 0,
      orderReminder: 0,
      files: [],
    },
  })
  const {
    data,
    isLoading: loadingProfileData,
    isFetching: fetchingProfileData,
    isError: profileDataError,
    isSuccess,
  } = useGetBusinessProfileQuery()
  const [
    uploadMutation,
    {
      data: fileMutationData,
      isSuccess: fileMutationSuccess,
      isLoading: fileMutationLoading,
    },
  ] = useUploadFileMutation()

  const [editBusinessProfile, { isLoading: editIsProcessing }] = useEditBusinessProfileMutation()

  const onSubmit = (data: IBusinessFormData) => {
    editBusinessProfile(data)
  }

  const handleExpand = (section: string): void => {
    setIsExpand((prev) => (prev === section ? null : section))
  }

  useEffect(() => {
    if (isSuccess && data) {
      const formattedData = {
        ...data,
        preOrder: data.preOrder ?? 0,
        orderReminder: data.orderReminder ?? 0,
        regionId: data.region.id,
        districtId: data.district.id,
        businessBookingTime: data.businessBookingTime.map(
          (opt: TBusinessBookingTime) => ({
            id: opt.id,
            bookingStartTime: opt.bookingStartTime,
            bookingEndTime: opt.bookingEndTime,
            isActive: opt.isActive ?? true,
          })
        ),
        // files: data.files
      }
      setRegionId(data.region.id)
      const imageURLS: string[] = []
      data.files.map((file) => imageURLS.push(file.url || ''))
      setImages(imageURLS)

      reset(formattedData)
    }
  }, [isSuccess])

  const filesRegister = register('files', {})

  useEffect(() => {
    if (fileMutationSuccess) {
      const filesObj = getValues('files')
      fileMutationData.map(fileId => {
        return filesObj.push({
          id: fileId,
          isProfile: false,
        })
      })
      if (filesObj[0]) {
        filesObj[0].isProfile = true
      }
      filesRegister.onChange({
        target: {
          name: filesRegister.name,
          value: filesObj,
        },
      })
    }
  }, [fileMutationData])

  if (loadingProfileData || fetchingProfileData) {
    return <Loader />
  }
  if (profileDataError) {
    return <h1>error</h1>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1">
        <div
          className={`business_profile_form bg-white p-6 rounded-sm overflow-hidden transition-all duration-300 h-[70px] sm:h-auto ${
            isExpand === 'businessProfileForm' ? 'auto_height' : 'h-[70px]'
          }`}
        >
          <BusinessProfileForm
            data={data}
            regionId={regionId}
            setRegionId={setRegionId}
            setValue={setValue}
            control={control}
            register={register}
            errors={errors}
            handleExpand={handleExpand}
          />
        </div>
        <div className="business_profile-time_pics flex flex-col gap-3">
          <div
            className={`business_profile-time_picker bg-white p-6 rounded-sm flex flex-col gap-3 overflow-hidden transition-all duration-300 h-[70px] sm:h-auto sm:flex-1 ${
              isExpand === 'bookingTimes' ? 'auto_height' : 'h-[70px]'
            }`}
          >
            <BookingHours
              days={data?.businessBookingTime ?? ([] as TBusinessBookingTime[])}
              handleExpand={handleExpand}
              control={control}
              getValues={getValues}
            />
          </div>
          <div
            className={`business_profile-pics_upload bg-white p-6 rounded-sm flex flex-col gap-3 overflow-hidden transition-all duration-300 h-[70px] sm:h-auto ${
              isExpand === 'businessPictures' ? 'auto_height' : 'h-[70px]'
            }`}
          >
            <FileUploader
              handleExpand={handleExpand}
              // register={register}
              images={images}
              setImages={setImages}
              error={fileUploaderErrors}
              setFileUploaderErrors={setFileUploaderErrors}
              getValues={getValues}
              uploadMutation={uploadMutation}
              filesRegister={filesRegister}
              loading={fileMutationLoading}
            />
          </div>
        </div>
      </div>
      <div className="save_button flex justify-end">
        <PrimaryButton
          className="w-[190px]"
          disabled={fileMutationLoading}
          loading={editIsProcessing}
        >
          {t('bookings.button.saveChanges')}
        </PrimaryButton>
      </div>
    </form>
  )
}

export default BusinessProfile
