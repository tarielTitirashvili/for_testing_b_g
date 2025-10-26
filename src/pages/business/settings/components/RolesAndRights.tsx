import { type FunctionComponent } from "react"

import { TabsContent } from "@/components/ui/tabs"

import EntityList from "@/components/shared/modals/EntityList"
import AddStaff from "@/pages/business/teams/staff/AddStaff"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import StaffRoles from "./StaffRoles"
import CustomDropdown from "@/components/shared/buttons/CustomDropdown"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import PrimaryPressable from "@/components/shared/buttons/PrimaryPressable"
import { useGetBusinessRolesQuery, useGetStaffQuery } from "@/redux/business/staff/staffAPISlice"
import { useGetAllServiceNamesQuery } from "@/redux/business/service/serviceAPISlice"

export interface IRole {
    id: string
    name: string
}

const RolesAndRights: FunctionComponent = () => {


    const { data: staffData = [] } = useGetStaffQuery()
    const { data: services = [] } = useGetAllServiceNamesQuery()
    const { data: roles = [] } = useGetBusinessRolesQuery() 

    return (
        <TabsContent value="rights">
            <div className="roles_rights-header mb-4">
                <p className="text-[#242424] font-semibold">წევრების მართვა</p>
                <p className="text-[#6C6C6C] text-sm">აკონტროლე გუნდის წევრების უფლებები</p>
            </div>
            <div className="team_members border-2 border-[#EBEBEB] rounded-md p-4 flex flex-col gap-4">
                <div className="team_members-header flex items-center">
                    <div className="title flex-1 text-lg text-[#242424] font-semibold">
                        გუნდის წევრები
                    </div>
                    <div className="team_param-buttons flex gap-3 w-max">
                        <EntityList
                            title="როლების მართვა"
                            description="მართე როლები მარტივად"
                            label="მიმდინარე როლები"
                            entities={roles}
                            EditComponent={(props) => <StaffRoles {...props} roles={roles} />}
                            primaryButtonText="Add Role"
                            primaryButtonClick={() => <StaffRoles />}
                        />
                        <CustomDropdown trigger={<PrimaryPressable>დაამატე</PrimaryPressable>}>
                            <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                <AddStaff roles={roles} services={services} />
                            </DropdownMenuItem>
                        </CustomDropdown>
                    </div>
                </div>
                <div className="team_table">
                    {staffData && staffData.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-4">Name</TableHead>
                                    <TableHead className="px-4">Email</TableHead>
                                    <TableHead className="px-4">Phone</TableHead>
                                    <TableHead className="px-4">Role</TableHead>
                                    <TableHead className="px-4">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {staffData.map(member => (
                                    <TableRow key={member.id} className="border-none">
                                        <TableCell className="border-t-1 px-4 py-3">{member.firstName} {member.lastName}</TableCell>
                                        <TableCell className="border-t-1 px-4 py-3">{/* member.email */}</TableCell>
                                        <TableCell className="border-t-1 px-4 py-3">{/* member.phone */}</TableCell>
                                        <TableCell className="border-t-1 px-4 py-3"><span className="border-2 py-1 px-3 rounded-full">{member.role.name}</span></TableCell>
                                        <TableCell className="border-t-1 px-4 py-3">
                                            <div className="action_btns flex gap-3">
                                                <AddStaff roles={roles} services={services} staffId={member.id} />
                                                <Trash2 color="#E81C1C" size={20} className="cursor-pointer" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            
                        </Table>
                    ) : (
                        <p>No team</p>
                    )}
                </div>
            </div>
        </TabsContent>
    )
}

export default RolesAndRights