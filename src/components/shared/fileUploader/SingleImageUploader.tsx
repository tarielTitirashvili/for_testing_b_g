import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import React, { useEffect, type FunctionComponent } from "react"
import type { useUploadFileMutation } from "@/redux/business/businessProfile/businessProfileAPISlice"
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form"
import type { IAddSalonServiceFormData } from "../../../pages/business/services/components/AddService"
import { isValidImageFile } from "@/utils/fileValidationCheckers"

interface ISingleImageUploaderProps {
  image: string | null
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  uploadFile: ReturnType<typeof useUploadFileMutation>[0]
  getValues: UseFormGetValues<IAddSalonServiceFormData>
  setValue: UseFormSetValue<IAddSalonServiceFormData>
  setImageError: React.Dispatch<React.SetStateAction<string | null>>
}

const MAX_FILE_SIZE_MB = 20

export const SingleImageUploader: FunctionComponent<ISingleImageUploaderProps> = ({ image, setImage, uploadFile, setValue, setImageError }) => {
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!isValidImageFile(file)) {
      setImageError("Only JPG and PNG formats are allowed")
      return
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setImageError(`File size can't be more than ${MAX_FILE_SIZE_MB}MB`)
      return
    }

    try {
      const res = await uploadFile({ files: [file] }).unwrap()
      const uploadedFileId = res?.[0]

      if (uploadedFileId) {
        setValue("fileIds", [uploadedFileId])
      }

      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    } catch (err) {
      setImageError(`File upload failed: ${err}`)
    }
  }


  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image)
    }
  }, [image])

  return (
    <div className="single_image_upload h-[100px]">
      {image ? (
          <div className="flex gap-5 relative">
            <X className="absolute bg-gray-200 top-1 left-1 rounded-full hover:opacity-100 opacity-80 cursor-pointer" size={16} onClick={() => setImage('')} />
            <img src={image} alt="preview" className="h-[100px] w-[100px] object-cover rounded-md" />
            <Label
                htmlFor="picture"
                className="text-base w-full h-[100px] flex-1 items-center font-medium text-neutral-800 cursor-pointer max-w-md rounded-xl border border-dashed border-[#EBEBEB] bg-transparent hover:bg-[#EFF0F1] text-center shadow-sm transition-colors flex flex-col align-middle justify-center"
            >
                <Plus /> Upload Picture
                <Input
                    id="picture"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </Label>
        </div>
    ) : (
        <Label
            htmlFor="picture"
            className="text-base w-full h-full items-center font-medium text-neutral-800 cursor-pointer max-w-md rounded-xl border border-dashed border-[#EBEBEB] bg-transparent hover:bg-[#EFF0F1] text-center shadow-sm transition-colors flex flex-col align-middle justify-center"
        >
            <Plus /> Upload Picture
            <Input
                id="picture"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </Label>
    )}
    </div>
  )
}