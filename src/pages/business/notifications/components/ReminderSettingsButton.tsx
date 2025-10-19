import type { FunctionComponent } from "react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings } from "lucide-react"

import { t } from "i18next"
import ValidatedSwitch from "@/components/shared/customSwitch/ValidatedSwitch"
import { useForm } from "react-hook-form"

type switchValue = {
    appReminder: boolean
    emailReminder: boolean
    reminderMins: number
}


const ReminderSettingsButton: FunctionComponent = () => {

    const { control, handleSubmit, register, formState: { errors } } = useForm<switchValue>({
        defaultValues: {
            appReminder: true,
            emailReminder: false
        },
        mode: "onChange"
    })

    const onSubmit = (data: switchValue) => console.log(data)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SecondaryButton className="bg-white w-max">
                    <Settings /> { t('notification.button.settings') }
                </SecondaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] flex flex-col gap-6">

                <DialogHeader>
                    <DialogTitle>{ t("notification.reminder.title") }</DialogTitle>
                    <DialogDescription>{ t("notification.reminder.description") }</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="dialog_content flex flex-col gap-6">
                    <SelectDropDown
                        label={t("notification.reminder.timeSelectLabel")}
                        options={[]} 
                        {...register('reminderMins', { required: 'this field is required' })}
                        error={ errors.reminderMins?.message }
                    />

                    <div className="reminder_type flex flex-col gap-3">
                        <div className="reminder_type-title font-semibold">
                            { t("notification.reminder.reminderTitle")}
                        </div>
                        <div className="app_reminder flex justify-between items-center">
                            <p className="flex-1 text-sm text-[#242424] font-normal">{ t("notification.reminder.appReminder") }</p>
                            <div>
                                <ValidatedSwitch
                                    name="appReminder"
                                    control={control}
                                />
                            </div>
                        </div>
                        <div className="app_reminder flex justify-between items-center">
                            <p className="flex-1 text-sm text-[#242424] font-normal">{ t("notification.reminder.mailReminder") }</p>
                            <div>
                                <ValidatedSwitch
                                    name="emailReminder"
                                    control={control}
                                />
                            </div>
                        </div>
                        
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>Close</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton>Save</PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ReminderSettingsButton