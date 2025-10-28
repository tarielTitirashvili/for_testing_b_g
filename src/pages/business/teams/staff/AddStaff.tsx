import React, { useEffect, useState, type FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'

import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { t } from 'i18next'

import UploadButton from '@/components/shared/buttons/UploadButton'
import ServiceButton from '@/components/shared/buttons/ServiceButton'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import SelectDropDown from '@/components/shared/inputs/SelectDropDown'
import TextInput from '@/components/shared/inputs/TextInput'
import { Pencil } from 'lucide-react'
import { useCreateStaffMutation, useGetStaffQuery } from '@/redux/business/staff/staffAPISlice'

interface IService {
    id: number
    name: string
}

interface IRole {
    id: string
    name: string
}

export interface IAddStaffFormData {
    // imgUrl?: string,
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    roleId: string
    serviceIds: string[]
}

interface IAddStaffProps {
    services: IService[]
    roles: IRole[]
    staffId?: string
}

const AddStaff: FunctionComponent<IAddStaffProps> = ({ services, roles, staffId }) => {

    const [staffImage, setStaffImage] = useState<string | null>(null)

    const { data: staffData } = useGetStaffQuery(undefined, { skip: !staffId })
    const [addStaff] = useCreateStaffMutation()


    const { register, formState: { errors }, setValue, watch, reset, handleSubmit } = useForm<IAddStaffFormData>({
        defaultValues: {
            serviceIds: []
        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const img = e.target.files?.[0]

        if (img) {
            const imgUrl = URL.createObjectURL(img)
            setStaffImage(imgUrl)
            // setValue('imgUrl', imgUrl)
        }
    }

    const selectedServices = watch('serviceIds') ?? [];

    const toggleService = (service: string): void => {
        const currentServices = watch('serviceIds') || []
        const services = new Set(currentServices)

        services.has(service) ? services.delete(service) : services.add(service)

        setValue('serviceIds', Array.from(services), { shouldValidate: true })
    }

    const handleStaffCreating = (data: IAddStaffFormData) => {

        const payload: IAddStaffFormData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            roleId: data.roleId,
            serviceIds: [...data.serviceIds],
        }

        console.log(payload)
        addStaff(payload)
    }

    const handleStaff = (data: IAddStaffFormData) => {

        if (!staffId) {
            handleStaffCreating(data)
        }

    }

    useEffect(() => {
        if (staffData && staffData.length > 0) {
            const staff = staffData[0]

            const formattedData: IAddStaffFormData = {
                firstName: staff.firstName ?? '',
                lastName: staff.lastName ?? '',
                email: '',
                phoneNumber: '',
                roleId: staff.role?.id?.toString() ?? '',
                serviceIds: staff.services?.map((s: IService) => s.id.toString()) ?? [],
            }

            reset(formattedData)
        }
    }, [staffData, reset])

    return (
        <Dialog >
            <DialogTrigger asChild>
                { !staffId ? (
                    <span 
                        className="hover:bg-[#f5f5f5] cursor-pointer  focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        გუნდის წევრი
                    </span>
                ) : (
                    <Pencil size={20} color='black' />
                ) }
            </DialogTrigger>
            <DialogContent className='max-w-[500px] w-full px-6 py-8 flex flex-col gap-6'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-bold'>
                        { t("team.addStaff.title") }
                    </DialogTitle>
                    <DialogDescription className='hidden' />
                </DialogHeader>

                <form onSubmit={handleSubmit(handleStaff)}>

                    <div className="profile_pic flex flex-col gap-2">
                        <div className="profile_pic-title font-normal text-sm text-[#242424]">
                            { t("team.staff.ProfilePic") }
                        </div>
                        <div className="profile_pic-params flex items-center justify-between">
                            <div className="profile_pic-group flex items-center gap-3">
                                <Avatar className='h-[80px] w-[80px]'>
                                    <AvatarImage src={staffImage ? staffImage : ''} alt='Staff' />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                                <UploadButton
                                    handleChange={handleImageChange}
                                >
                                    { t("team.addStaff.uploadPic") }
                                </UploadButton>
                            </div>
                        </div>
                    </div>

                    <div className="staff_info">
                        <TextInput
                            label={t("bookings.inputLabel.firstName")}
                            type='text'
                            {...register('firstName', { required: t("bookings.formValidation.required.firstName")})}
                            error={errors.firstName?.message}
                        />
                    </div>

                    <div className="staff_info">
                        <TextInput
                            label={t("bookings.inputLabel.lastName")}
                            type='text'
                            {...register('lastName', { required: t("bookings.formValidation.required.lastName")})}
                            error={errors.lastName?.message}
                        />
                    </div>

                    <div className="staff_info">
                        <TextInput
                            label={t("bookings.inputLabel.email")}
                            type='text'
                            {...register('email', { required: t("bookings.formValidation.required.email")})}
                            error={errors.email?.message}
                        />
                    </div>

                    <div className="staff_info">
                        <TextInput
                            label={t("bookings.inputLabel.mobileNumber")}
                            type='text'
                            {...register('phoneNumber', { required: t("bookings.formValidation.required.mobileNumber")})}
                            error={errors.phoneNumber?.message}
                        />
                    </div>

                    <SelectDropDown
                        label='როლი' options={roles ? roles : null}
                        sentId
                        {...register('roleId', { required: t("bookings.formValidation.required.role") })}
                        error={errors.roleId?.message}
                    />

                    <div className="staff_services flex flex-col gap-2">
                        <div className={`staff_services-title font-medium ${errors.serviceIds?.message && 'text-red-500'}`}>
                            { t("team.staff.services") }
                        </div>
                        <div className="staff_services-list-block">
                            <div className="staff_services-list  flex flex-wrap gap-3 h-34 overflow-auto">
                                {services.map(service => (
                                    <ServiceButton
                                        key={service.id}
                                        service={service.name}
                                        isSelected={selectedServices.includes(service.id.toString())}
                                        onToggle={() => toggleService(service.id.toString())}
                                    />
                                ))}
                            </div>
                            <TextInput
                                type="hidden"
                                {...register('serviceIds', { required: t("bookings.formValidation.required.staffService") })}
                                error={errors.serviceIds?.message}
                            />
                        </div>
                    </div>


                    <DialogFooter>
                        <DialogClose className='w-full border-[#BEBEBE] border-2 rounded-md py-2 cursor-pointer'>
                            { t("bookings.actionButtons.cancel") }
                        </DialogClose>
                        <PrimaryButton>
                            { t("bookings.button.add") }
                        </PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddStaff