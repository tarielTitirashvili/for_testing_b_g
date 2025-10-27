import { useEffect, useState, type FunctionComponent } from 'react'

import { DialogDescription, DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import { useCreateServiceMutation, useEditServiceMutation, useGetServicesByIdQuery, type IEditService } from '@/redux/business/service/serviceAPISlice'

import { useUploadFileMutation } from '@/redux/business/businessProfile/businessProfileAPISlice'
import { SingleImageUploader } from '../../../../components/shared/fileUploader/SingleImageUploader'

import { t } from 'i18next'

import type { TService } from '../Services'

import TextInput from '@/components/shared/inputs/TextInput'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

export interface IAddSalonServiceFormData {
  categoryId: number
  price: string
  durationInMinutes: string
  locales: {
    name: string
    languageId: number
    description: string
  }[]
  businessStaffIds?: number[]
  fileIds?: number[]
  files?: {
    id: number,
    url: string,
    isProfile: boolean
  }
}

export interface IServiceEdit extends Omit<IAddSalonServiceFormData, 'categoryId'> {
  serviceId: number
  fileIds: number[]
}

interface ICategory {
  id: string
  name: string
}

interface IAddService {
  categories: ICategory[]
  service?: TService
  categoryId?: string
  icon?: boolean
  serviceId?: number
  files?: {
    id: number,
  }[]
}

const AddService: FunctionComponent<IAddService> = ({ serviceId, categories, icon }) => {

  const { register, handleSubmit, formState: { errors }, reset, getValues, setValue} = useForm<IAddSalonServiceFormData>({
    defaultValues: {
      locales: [
        {
          languageId: 1,
        },
      ],
      fileIds: [],
    },
  })

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data, isSuccess: serviceByIdSuccess } = useGetServicesByIdQuery(
    serviceId ? serviceId : undefined, { skip: serviceId === undefined }
  )

  const [createService] = useCreateServiceMutation()
  const [editService] = useEditServiceMutation()

  const [image, setImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  const [uploadFile] = useUploadFileMutation()

  const handleCreate = (data: IAddSalonServiceFormData) => {
    const payload = {
      categoryId: data.categoryId,
      businessStaffIds: data.businessStaffIds || [],
      durationInMinutes: +data.durationInMinutes,
      price: +data.price,
      fileIds: data.fileIds || [],
      locales: data.locales,
    }
    createService(payload)
    console.log(payload)
  }

  const handleEdit = (data: IAddSalonServiceFormData) => {
    const payload: IEditService = {
      serviceId: serviceId,
      businessStaffIds: data.businessStaffIds || [],
      durationInMinutes: +data.durationInMinutes,
      price: +data.price,
      // fileIds: data.files?.id ? [data.files?.id!] : data?.fileIds!,
      fileIds: data.fileIds || [],
      locales: data.locales,
    }

    editService(payload)
  }

  const handleService = (data: IAddSalonServiceFormData) => {
    if (serviceId) {
      handleEdit(data)
    } else {
      handleCreate(data)
    }

    setModalOpen(false)
  }

  const handleRemoveImage = () => {
    setImage(null)
    setValue('fileIds', [])
    setValue('files', undefined)
  }


  useEffect(() => {
    if (serviceByIdSuccess && data) {
      if ('files' in data && Array.isArray(data.files)) {
        console.log(data)
        reset({
          ...data,
          price: data.price.toString(),
          durationInMinutes: data.durationInMinutes.toString(),
          fileIds: data.files.length ? [data.files[0].id] : [],
          files: data.files.length ? data.files[0] : undefined,
        })
        setImage(data.files?.[0]?.url || null)
      }
    }
  }, [serviceByIdSuccess])

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger 
        className="cursor-pointer hover:bg-[#F5F5F5] w-full focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        {icon && <Pencil size={20} />} {t('bookings.button.service')}
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>Add a Service</DialogTitle>
          <DialogDescription>Add a New Service</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleService)}
          className="flex flex-col gap-6"
        >
          <TextInput
            label="Service Name"
            {...register('locales.0.name', {
              required: 'Service Name is Required',
            })}
            error={errors.locales?.[0]?.name?.message}
          />

          <TextInput
            label="Service Description"
            {...register('locales.0.description', {
              required: 'Service Description is Required',
            })}
            error={errors.locales?.[0]?.description?.message}
          />

          <div className="price_time_inputs-wrapper grid grid-cols-2 gap-3">
            <TextInput
              type="number"
              label="Price (₾)"
              {...register('price', { required: 'Service Price is Required' })}
              error={errors.price?.message}
            />
            <TextInput
              type="number"
              label="Time (Min)"
              {...register('durationInMinutes', {
                required: 'Service Time is Required',
              })}
              error={errors.durationInMinutes?.message}
            />
          </div>

          <SelectDropDown
            options={categories}
            sentId={true}
            {...register('categoryId', {
              required: 'Service Category is Required',
              setValueAs: Number,
            })}
            error={errors.categoryId?.message}
          />

          <div className="form_file-uploader w-full">
            <SingleImageUploader
              image={image}
              setImage={setImage}
              uploadFile={uploadFile}
              setValue={setValue}
              getValues={getValues}
              setImageError={setImageError}
              onRemove={handleRemoveImage}
            />
            {imageError && <span className='text-red-500 text-sm font-medium'>{imageError}</span>}
          </div>

          <div className="form_buttons flex gap-3">
            <DialogClose className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer">
              Close
            </DialogClose>
            <PrimaryButton className='flex-1'>
              {serviceId ? "Edit" : "Create"}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddService