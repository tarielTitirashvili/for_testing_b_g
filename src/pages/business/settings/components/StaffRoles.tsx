import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import SelectDropDown from "@/components/shared/inputs/SelectDropDown"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import type { FunctionComponent } from "react"
import { useForm } from "react-hook-form"

// interface IService {
//     id: string
//     name: string
// }

interface IRole {
    id: string
    name: string
}

// interface IStaffRolesProps {
//     icon?: boolean
//     triggerText?: string
//     roles?: IRole[]
//     categoryId?: string
// }

interface IRole {
    id: string,
    name: string
}

interface IStaffRolesProps {
    initialValue?: string
    categoryId?: string
    icon?: boolean
    triggerText?: string
    roles?: IRole[] 
}

const StaffRoles: FunctionComponent<IStaffRolesProps> = ({ initialValue="", icon, triggerText, categoryId, roles }) => {

    const { } = useForm<IRole>({
        defaultValues: {
            name: initialValue
        }
    })

    return (
        <Dialog>
            <DialogTrigger>
                { icon && <Pencil size={25} /> } { triggerText }
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>როლის დამატება</DialogTitle>
                    <DialogDescription>მართე როლები მარტივად</DialogDescription>
                </DialogHeader>
                <form className="dialog_body flex flex-col gap-6">
                    <SelectDropDown
                        options={roles ?? []}
                        label="როლი"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>დაბრუნება</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton>
                            { categoryId ? 'შენახვა' : "დამატება" }
                        </PrimaryButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StaffRoles