import { useTranslation } from 'react-i18next'
import DropdownSelect, {
  type TDropdownSelectOption,
} from '@/components/shared/inputs/dropdownSelect'
import { Plus, User } from 'lucide-react'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

type Props = {
  staffData: TDropdownSelectOption<string>[] | undefined
  tableCategoryIds: TDropdownSelectOption<number>[] | undefined
  selectedTableCategoryId: number | null
  handleSetSelectedTableCategoryId: (id: number) => void
  selectedStaffId: string | null
  handleSetSelectedStaffId: (id: string) => void
  isBarber: boolean
  handleClickToday: () => void
  handleChangeIsOpen: (isOpenStatus: boolean) => void
}

const CalendarFilters = (props: Props) => {
  const {
    staffData,
    selectedStaffId,
    handleSetSelectedStaffId,
    isBarber,
    tableCategoryIds,
    handleSetSelectedTableCategoryId,
    handleClickToday,
    handleChangeIsOpen,
  } = props
  const { t } = useTranslation()

  const selectedStaffObj = staffData?.find(
    (staff) => staff.id === selectedStaffId
  )

  return (
    <div className="flex py-3 justify-between flex-wrap gap-2">
      <span className="flex pag-5 items-center">
        {isBarber && (
          <DropdownSelect
            withPictures
            className="bg-white min-w-[230px] text-[16px]! h-12!"
            valueClassName={'text-[16px]'}
            options={staffData ?? []}
            value={selectedStaffId ? selectedStaffObj?.value : null}
            placeholder={t('team.staff.count')}
            onChange={(id) => {
              handleSetSelectedStaffId(id)
            }}
            defaultIcon={<User />}
          />
        )}
        {!isBarber && (
          <DropdownSelect<number>
            withPictures
            className="bg-white min-w-[190px] text-[16px]! h-12!"
            valueClassName={'text-[16px]'}
            options={tableCategoryIds ?? []}
            value={selectedStaffId ? selectedStaffObj?.value : null}
            placeholder={t('calendar.text.choseSpace')}
            onChange={(id: number) => {
              handleSetSelectedTableCategoryId(id)
            }}
          />
        )}
        <PrimaryButton
          handleClick={handleClickToday}
          className="ml-4 py-3! bg-white text-[#242424] font-normal font-[16px]"
        >
          {t('calendar.text.today')}
        </PrimaryButton>
      </span>
      <span>
        <div onClick={() => handleChangeIsOpen(true)}>
          <PrimaryButton>
            <Plus className="w-3.5" />
            {t('business.buttons.addNewBooking')}
          </PrimaryButton>
        </div>
      </span>
    </div>
  )
}

export default CalendarFilters
