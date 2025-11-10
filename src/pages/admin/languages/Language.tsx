import type { FunctionComponent } from "react"

import { t } from "i18next"

import { useDeleteLanguageMutation, useGetAllLanguagesQuery } from "@/redux/admin/language/languageAPISlice"

import { Search } from "lucide-react"

import TextInput from "@/components/shared/inputs/TextInput"
import LanguagesTable from "./components/LanguagesTable"
import AddLanguage from "./components/AddLanguage"

const Language: FunctionComponent = () => {

    const {
        data: languageData,
        isLoading: isLanguageLoading
    } = useGetAllLanguagesQuery()

    const [deleteLanguage] = useDeleteLanguageMutation()

    return (
        <div className="bg-white p-5 rounded-md flex flex-col gap-4">
            <div className="regions_header flex items-center justify-between">
                <div className="reviews_header-search relative text-[#6C6C6C] w-full">
                    <Search
                        className="absolute top-[55%] -translate-y-1/2 left-[10px]"
                        size={15}
                    />
                    <TextInput
                        className="pl-[30px] max-w-[300px] w-full border-[#EBEBEB]"
                        placeholder={t('bookings.button.search')}
                    />
                </div>
                <AddLanguage />
            </div>

            <LanguagesTable
                languageData={languageData ?? []}
                deleteLanguage={deleteLanguage}
                isLanguageLoading={isLanguageLoading}
            />
        </div>
    )
}

export default Language