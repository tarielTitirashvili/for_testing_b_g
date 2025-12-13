import type { FunctionComponent } from "react"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Settings } from "lucide-react"

import { t } from "i18next"

import SecondaryButton from "../buttons/SecondaryButton"
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal"

interface IEntity {
    isSystem?: boolean
    id: string | number,
    name: string
}

interface EditComponentProps {
  icon?: boolean;
  categoryId: string;
}

interface IEntityListProps {
    entities: IEntity[]
    title?: string
    description?: string
    label?: string
    primaryButtonText?: string
    primaryButtonClick?: () => void
    removeItem?: (id: number) => void
    EditComponent?: React.ComponentType<EditComponentProps>
    isDeleteProgress?: boolean
}

const EntityList: FunctionComponent<IEntityListProps> = ({ entities, title, description, label, /*primaryButtonText, primaryButtonClick, */ removeItem, EditComponent, isDeleteProgress }) => {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SecondaryButton className="p-2 h-fit w-fit flex items-center gap-1.5"><Settings /> {label}</SecondaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full flex flex-col gap-5">
                <DialogHeader className="gap-0">
                    <DialogTitle className="text-xl font-bold">{ title }</DialogTitle>
                    <DialogDescription>{ description }</DialogDescription>
                </DialogHeader>
                <div className="dialog_body flex flex-col gap-2">
                    {label && <p className="font-semibold">{ label }</p>}
                    <div className="entity_list flex flex-col gap-4">
                        {entities.map((entity) => !entity.isSystem && (
                            <div key={entity.id} className="flex justify-between items-center border-2 px-2 py-3 rounded-md">
                                <div className="entity_name">
                                    { entity.name }
                                </div>
                                <div className="action_btns flex items-center gap-2">
                                    {EditComponent && <EditComponent icon categoryId={String(entity.id)} />}
                                    <DeleteConfirmationModal
                                        itemId={+entity.id}
                                        handleDeleteItem={removeItem!}
                                        modalTitle={t("categories.deleteModalt.title")}
                                        modalDescription={t("categories.deleteModalt.description", {
                                            category: entity.name
                                        })}
                                        isDeleteProgress={isDeleteProgress}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <SecondaryButton>{t('bookings.button.close')}</SecondaryButton>
                    </DialogClose>
                    {/* <PrimaryButton handleClick={primaryButtonClick}>{ primaryButtonText }</PrimaryButton> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EntityList