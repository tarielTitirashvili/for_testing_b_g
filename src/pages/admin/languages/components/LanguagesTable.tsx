import type { FunctionComponent } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import type { IGetLanguages } from "@/redux/admin/language/languageAPISlice"

import { t } from "i18next"

import { Skeleton } from "@/components/ui/skeleton"

import AddLanguage from "./AddLanguage"
import DeleteConfirmationModal from "@/components/shared/modal/DeleteConfirmationModal"

interface ILanguagesTableProps {
    languageData: IGetLanguages[]
    deleteLanguage: (languageId: number) => void
    isLanguageLoading: boolean
}

const LanguagesTable: FunctionComponent<ILanguagesTableProps> = ({ languageData, deleteLanguage, isLanguageLoading }) => {
    
    if (isLanguageLoading) {
        return (
            <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-full">{t('settings.mainSettings.profile.language')}</TableHead>
                    <TableHead>{t('bookings.table.actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {languageData.map((language) => (
                    <TableRow key={language.id}>
                        <TableCell className="w-full">{language.name}</TableCell>
                        <TableCell className="flex items-center gap-2 justify-end">
                            <AddLanguage languageId={language.id} />
                            <DeleteConfirmationModal
                                itemId={language.id}
                                handleDeleteItem={deleteLanguage}
                                modalTitle={ t('admin.language.deleteModal.title') }
                                modalDescription={ t("admin.language.deleteModal.text", {
                                    language: `"${language.name}"`
                                }) }
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
    
}

export default LanguagesTable
