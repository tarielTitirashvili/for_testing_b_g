import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { IBusinessFormData, TFile } from '@/pages/business/businessProfile/BusinessProfile'
import type { useUploadFileMutation } from '@/redux/business/businessProfile/businessProfileAPISlice'
import { isValidImageFile } from '@/utils/fileValidationCheckers'
import { ChevronDown, Plus, X } from 'lucide-react'
import { useEffect } from 'react'
import type {
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Loader from '../loader'

const MAX_FILE_COUNT = 20
const MAX_FILE_SIZE_MB = 20

interface IFileUploaderProps {
  handleExpand?: (section: string) => void
  error: string | null
  getValues: UseFormGetValues<IBusinessFormData>
  uploadMutation: ReturnType<typeof useUploadFileMutation>[0]
  filesRegister: ReturnType<UseFormRegister<IBusinessFormData>>
  loading: boolean
  setFileUploaderErrors: React.Dispatch<React.SetStateAction<string | null>>
  images: string[] | []
  setImages:  React.Dispatch<React.SetStateAction<string[] | []>>
}

export default function FileUploader(props: IFileUploaderProps) {
  const {
    handleExpand,
    // register,
    error,
    getValues,
    uploadMutation,
    filesRegister,
    loading,
    setFileUploaderErrors,
    images,
    setImages
  } = props

  const { t } = useTranslation()


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    if (!files) return
    const oldFiles = getValues('files') || []

    
    if(oldFiles.length + files.length > MAX_FILE_COUNT){
      return setFileUploaderErrors(`you can upload maximum ${MAX_FILE_COUNT} files`)
    }

    for (const file of files) {
      if (!isValidImageFile(file)) {
        setFileUploaderErrors('Only JPG and PNG formats are allowed')
        return // ⛔ stops here
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileUploaderErrors(`File size can't be more than ${MAX_FILE_SIZE_MB}MB`)
        return // ⛔ stops here
      }
    }
    if(error){
      setFileUploaderErrors(null)
    }
    uploadMutation({files: files})

    const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...imageUrls])
  }

  const deleteFile = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    // update local preview URLs
    setImages(newImages)
    // remove the corresponding file object from the form values
    const oldFiles = (getValues('files') || []) as TFile[]
    const newFiles = oldFiles.filter((_, i) => i !== index)
    filesRegister.onChange({
      target: {
        name: filesRegister.name,
        value: newFiles,
      },
    })
  }

  useEffect(() => {
    return () => {
      images.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="pic_upload-title text-lg font-semibold flex justify-between items-center">
        <div className="title">{t('businessProfile.uploadPictures.title')}</div>
        <div
          className="expand_btn flex sm:hidden"
          onClick={() => handleExpand && handleExpand('businessPictures')}
        >
          <ChevronDown className={`transition-transform duration-300`} />
        </div>
      </div>
        {error !== null && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      <Loader loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 max-h-[500px] overflow-y-auto mt-1">
          {images.map((src, index) => {
            if (index < 7) {
              return (
                <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border w-full `}
                >
                  <span className='absolute right-1 top-1 rounded-full bg-[#00000070] p-1 cursor-pointer' onClick={()=>deleteFile(index)}>
                    <X className='text-white' />
                  </span>
                  <img
                    src={src}
                    alt={`uploaded-${index}`}
                    className="object-cover w-full h-full"
                    />
                  {index === 6 && (
                    <div className="absolute inset-0 bg-black opacity-60 z-10 font-normal text-xl text-[#fff] flex items-center justify-center">
                      +{images.length - 7} Photos
                    </div>
                  )}
                </div>
              )
            } else {
              return
            }
          })}
          <Label
            htmlFor="picture"
            className="text-base w-full h-full items-center font-medium text-neutral-800 cursor-pointer max-w-md rounded-xl border border-dashed border-#EBEBEB bg-[transparent] hover:bg-[#EFF0F1] text-center shadow-sm transition-colors flex flex-col align-middle justify-center"
            >
            <Plus />
            Upload Picture
            <Input
              id="picture"
              type="file"
              disabled={loading}
              multiple
              {...filesRegister}
              onChange={(e) => {
                handleFileChange(e)
              }}
              className="hidden"
              />
          </Label>
        </div>
      </Loader>
    </div>
  )
}
