import { api } from "@/api/api"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import CustomSwitch from "@/components/shared/customSwitch"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import TextInput from "@/components/shared/inputs/TextInput"
import { TabsContent } from "@/components/ui/tabs"
import { t } from "i18next"
import { Mail, Phone, ClockAlert, Lock } from "lucide-react"
import { useEffect, useState, type FunctionComponent } from "react"

interface IRole {
    id: string
    name: string
}

interface IBusiness {
    id: string
    name: string
}

interface IProfile {
    id: string
    role: IRole
    business: IBusiness
    firstName: string
    lastName: string
    birthDate: string
    email: string
    phoneNumber: string
    createDate: string
    file: string[]
}

const MainSettings: FunctionComponent = () => {

    const [userProfile, setUserProfile] = useState<IProfile | null>(null)

    const getProfile = async () => {
        try {
            const res = await api.get<IProfile>('/account/profile')
            const result = res.data
            setUserProfile(result)
        } catch (err) {
            console.log(err)
        }
    }

    const languages = [
        {
            id: '1',
            name: 'eng'
        },
        {
            id: '2',
            name: 'Geo'
        },
    ]

    const businessCategories = [
        {
            id: '1',
            name: "barbershop"
        },
        {
            id: '2',
            name: "restaurant"
        },
    ]

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <TabsContent value="main" className="flex gap-10 p-6 border-2 rounded-md">

            <div className="main_settings-left flex-1 flex flex-col gap-4">

                <div className="main_settings-heading">
                    <p className="text-[#242424] text-lg font-semibold">{ t('settings.mainSettings.title') }</p>
                    <p className="text-[#6C6C6C] text-sm font-normal">{ t('settings.mainSettings.description') }</p>
                </div>

                <TextInput
                    label={ t('settings.mainSettings.profile.uniqueCode') }
                    readOnly
                    value='CV345IK21L'
                />

                <TextInput
                    label={ t('bookings.inputLabel.email') }
                    type="email"
                    readOnly
                    value={userProfile?.email}
                    InputIcon={Mail}
                />

                <TextInput
                    label={ t('bookings.inputLabel.mobileNumber') }
                    readOnly
                    value={userProfile?.phoneNumber ?.replace(/(\+\d{3})(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}
                    InputIcon={Phone}
                />

                <div className="main_settings-password_field flex w-full items-end gap-3">
                    <TextInput 
                        InputIcon={Lock}
                        placeholder="•••••••••••••"
                        label={ t('bookings.inputLabel.password') } 
                        type="password" 
                        className="flex-1 w-full"
                    />
                    <SecondaryButton className="w-fit h-10 border-[#EBEBEB]">Change Password</SecondaryButton>
                </div>

                <SelectDropDown
                    label={ t('settings.mainSettings.profile.language') }
                    options={languages}
                />

                <SelectDropDown
                    label={ t('settings.mainSettings.profile.businessCategory') }
                    options={businessCategories}
                />
                
                <div className="pause_business flex items-center gap-2 p-2 cursor-pointer">
                    <ClockAlert color="#EF7800" />
                    <span>{ t('settings.mainSettings.profile.pauseBusiness') }</span>
                </div>

            </div>

            <div className="line w-[1px] bg-[#EBEBEB]"></div>
            
            <div className="main_setting-right flex-1 flex flex-col gap-4">
                <div className="main_settings-heading">
                    <p className="text-[#242424] text-lg font-semibold">{ t('settings.mainSettings.notifications.title') }</p>
                    <p className="text-[#6C6C6C] text-sm font-normal">{ t('settings.mainSettings.notifications.description') }</p>
                </div>

                <div className="notification_types flex flex-col gap-2">
                    <div className="notification_types-title text-[#242424] font-semibold">
                        { t('settings.mainSettings.notifications.types') }
                    </div>
                    <div className="types flex flex-col gap-3">
                        <div className="notification_type-news flex items-center">
                            <div className="notification_type-news-text w-full">
                                <p className="text-[#242424]">{ t('notifications.type.news.title') }</p>
                                <p className="text-[#6C6C6C] text-sm font-normal">{ t('notifications.type.news.description') }</p>
                            </div>
                            <div>
                                <CustomSwitch />
                            </div>
                        </div>
                        <div className="notification_type-news flex items-center">
                            <div className="notification_type-news-text w-full">
                                <p className="text-[#242424]">{ t('notifications.type.important.title') }</p>
                                <p className="text-[#6C6C6C] text-sm font-normal">{ t('notifications.type.important.description') }</p>
                            </div>
                            <div>
                                <CustomSwitch />
                            </div>
                        </div>
                        <div className="notification_type-news flex items-center">
                            <div className="notification_type-news-text w-full">
                                <p className="text-[#242424]">{ t('notifications.type.subscription.title') }</p>
                                <p className="text-[#6C6C6C] text-sm font-normal">{ t('notifications.type.subscription.description') }</p>
                            </div>
                            <div>
                                <CustomSwitch />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="separator h-[1px] w-full bg-[#EBEBEB]"></div>

                <div className="message_methods flex flex-col gap-2">
                    <div className="message_methods-title text-[#242424] font-semibold">
                        { t('settings.mainSettings.notifications.methods') }
                    </div>
                    <div className="methods flex flex-col gap-3">
                        <div className="notification_type-news flex items-center">
                            <div className="notification_type-news-text w-full">
                                <p className="text-[#242424]">{ t('notifications.methods.app.title') }</p>
                                <p className="text-[#6C6C6C] text-sm font-normal">{ t('notifications.methods.app.description') }</p>
                            </div>
                            <div>
                                <CustomSwitch />
                            </div>
                        </div>
                        <div className="notification_type-news flex items-center">
                            <div className="notification_type-news-text w-full">
                                <p className="text-[#242424]">{ t('notifications.methods.mail.title') }</p>
                                <p className="text-[#6C6C6C] text-sm font-normal">{ t('notifications.methods.mail.description') }</p>
                            </div>
                            <div>
                                <CustomSwitch />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </TabsContent>
    )
}

export default MainSettings
