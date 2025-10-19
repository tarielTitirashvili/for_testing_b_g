export const isValidImageFile = (file: File): boolean => {
  const allowedMimeTypes = ['image/jpeg', 'image/png']
  const allowedExtensions = ['jpg', 'jpeg', 'png']

  const fileExtension = file.name.split('.').pop()?.toLowerCase()

  const isMimeValid = allowedMimeTypes.includes(file.type)
  const isExtensionValid = fileExtension ? allowedExtensions.includes(fileExtension) : false

  return isMimeValid && isExtensionValid
}

export interface IUploadPayload {
  files: File[]
}


export const toFormData = (payload: IUploadPayload): FormData => {
  const formData = new FormData()
  payload.files.forEach((file) => {
    formData.append('files', file) // key must match backend’s expected field name
  })
  console.log(formData, 'formdata')
  return formData
}