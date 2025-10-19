import type { FunctionComponent } from "react"

import StaffCard from "./staff/StaffCard"
import { t } from "i18next"

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

const Team: FunctionComponent = () => {

    const staffData: IStaffCard[]  = [
        {
            firstName: "Nino",
            lastName: "Beridze",
            email: "nino.beridze@example.com",
            phone: "+995 599 123 456",
            position: "Hair Stylist",
            services: ["Haircut", "Coloring"],
            status: "active"
        },
        {
            firstName: "Giorgi",
            lastName: "Kiknadze",
            email: "giorgi.k@example.com",
            phone: "+995 598 654 321",
            position: "Massage Therapist",
            services: ["Swedish Massage", "Deep Tissue"],
            status: "inactive",
            imgUrl: 'assets/images/staff.jpeg'
        },
        {
            firstName: "Tamar",
            lastName: "Lashkhi",
            email: "tamar.l@example.com",
            phone: "+995 577 111 222",
            position: "Cosmetologist",
            services: ["Facial", "Peeling"],
            status: "active"
        },
        {
            firstName: "Luka",
            lastName: "Gvenetadze",
            email: "luka.g@example.com",
            phone: "+995 591 333 444",
            position: "Barber",
            services: ["Beard Trim", "Men's Haircut"],
            status: "active"
        },
        {
            firstName: "Mariam",
            lastName: "Gogoladze",
            email: "mariam.g@example.com",
            phone: "+995 595 555 666",
            position: "Nail Technician",
            services: ["Manicure", "Pedicure"],
            status: "inactive",
        }
    ]

    return (
        <div className="flex flex-col gap-6 py-6">
            <div className="team_header flex items-center justify-between">
                <div className="team_header-member_count text-lg font-semibold">
                    { t("team.staff.count") } ({staffData.length})
                </div>
            </div>
            <div className="team_members-list flex flex-wrap gap-6">
                {staffData.map((staff, index) => (
                    <StaffCard key={index} {...staff} />
                ))}
            </div>
        </div>
    )
}

export default Team