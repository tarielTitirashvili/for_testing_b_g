import type { FunctionComponent } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardAction, CardFooter, CardHeader } from "@/components/ui/card";

import StaffSettingMenu from "@/components/shared/buttons/StaffSettingMenu";
import { t } from "i18next";


interface IStaffCard {
    firstName: string
    lastName: string
    position: string
    status: string
    // status: 'active' | 'inactive'
    email: string
    phone: string
    services: string[]
    imgUrl?: string
}

const StaffCard: FunctionComponent<IStaffCard> = ({ firstName, lastName, position, status, services, imgUrl }) => {
    return (
        <Card className="w-full max-w-[500px] rounded-md flex flex-col gap-4 border-3 border-[#EBEBEB] shadow-none">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar className="h-[80px] w-[80px]">
                        <AvatarImage src={ imgUrl } />
                        <AvatarFallback className="text-4xl font-medium">{ firstName.slice(0, 1) }</AvatarFallback>
                    </Avatar>
                    <div className="staff_info flex flex-col">
                        <div className="staff_info-name text-lg font-medium">
                            { firstName } { lastName }
                        </div>
                        <div className="staff_info-position text-[#6c6c6c]">
                            { position }
                        </div>
                        <div className="staff_info-status text-sm font-medium capitalize">
                            {status}
                        </div>
                    </div>
                </div>
                <CardAction>
                    <StaffSettingMenu />
                </CardAction>
            </CardHeader>
            <CardFooter className="flex flex-col items-start gap-3">
                <div className="card_services-title font-medium">
                    { t("team.staff.services") }
                </div>
                <div className="card_services-list flex flex-wrap gap-2">
                    {services.slice(0, 2).map((service, index) => (
                        <span key={index} className="font-medium px-4 py-1 border-[#ebebeb] border-2 rounded-full">
                            {service}
                        </span> 
                    ))}
                    {services.length > 2 && (
                        <span className="font-medium px-4 py-1 border-[#ebebeb] border-2 rounded-full">
                            +{services.length - 2} more
                        </span> 
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default StaffCard;