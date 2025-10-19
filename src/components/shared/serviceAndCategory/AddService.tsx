import { useEffect, type FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'

import {
  useCreateServiceMutation,
  useEditServiceMutation,
  useGetServicesByIdQuery,
  type IEditService,
} from '@/redux/business/service/serviceAPISlice'

import TextInput from '@/components/shared/inputs/TextInput'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

interface IAddSalonServiceFormData {
  categoryId: number
  price: string
  durationInMinutes: string
  locales: {
    name: string
    languageId: number
    description: string
  }[]
  businessStaffIds?: number[]
  fileIds: number[]
}

export interface IServiceEdit
  extends Omit<IAddSalonServiceFormData, 'categoryId'> {
  serviceId: number
  fileIds: number[]
}

interface ICategory {
  id: string
  name: string
}

interface IService {
  id: number
  price: number
  durationInMinutes: number
  hasAssignedStaff: boolean
  name: string
  description?: string
}

interface IAddService {
  categories: ICategory[]
  service?: IService
  categoryId?: string
  icon?: boolean
  serviceId?: number
}

const AddService: FunctionComponent<IAddService> = ({
  serviceId,
  categories,
  icon,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddSalonServiceFormData>({
    defaultValues: {
      locales: [
        {
          languageId: 1,
        },
      ],
      fileIds: [],
    },
  })

  const { t } = useTranslation()

  const { data, isSuccess: serviceByIdSuccess } = useGetServicesByIdQuery(
    serviceId ? serviceId : undefined,
    {
      skip: serviceId === undefined,
    }
  )

  const [createService] = useCreateServiceMutation()
  const [editService] = useEditServiceMutation()

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
  }

  const handleEdit = (data: IAddSalonServiceFormData) => {
    const payload: IEditService = {
      serviceId: serviceId,
      businessStaffIds: data.businessStaffIds || [],
      durationInMinutes: +data.durationInMinutes,
      price: +data.price,
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
  }

  useEffect(() => {
    if (serviceByIdSuccess && data) {
      reset({
        price: data.price.toString(),
        durationInMinutes: data.durationInMinutes.toString(),
      })
    }
  }, [serviceByIdSuccess])

  return (
    <Dialog>
      <DialogTrigger className="flex gap-1.5 text-sm cursor-pointer w-full">
        <>
          {icon && <Pencil size={20} />} {t('bookings.button.service')}
        </>
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
            {/* <FileUploader images={[]} error={''} filesRegister={}  /> */}
          </div>

          <div className="form_buttons flex gap-3">
            <DialogClose className="flex-1 w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer">
              Close
            </DialogClose>
            <PrimaryButton className="flex-1">Add</PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddService
