import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'
import EmptyResponse from '../emptyResponse'

export type TDropdownSelectOption<T> = {
  id: T
  value?: T
  label: string
  url?: string
}

type TProps<T extends string | number = string> = {
  value: string | number | null | undefined
  options: TDropdownSelectOption<T>[]
  placeholder?: string
  label?: string
  onChange: (value: T) => void
  className?: string
  withPictures?: boolean
  defaultIcon?: React.ReactNode
  valueClassName?: string
  disabled?: boolean
}

function DropdownSelect<T extends string | number = string>({
  value,
  options,
  placeholder = 'Select an option',
  label,
  onChange,
  className,
  withPictures = false,
  defaultIcon,
  valueClassName,
  disabled
}: TProps<T>) {

  const { t } = useTranslation()
  const normalizedValue =
    value === null || value === '' || value === undefined
      ? undefined
      : String(value)

  return (
    <Select
      value={normalizedValue}
      onValueChange={(val) => onChange?.(val as T)}
      disabled={disabled}
    >
      <SelectTrigger className={`w-full min-w-[180px] min-h-12 ${className}`}>
        <SelectValue className={valueClassName ? valueClassName : ''} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{t(label)}</SelectLabel>}
          {
            options.length === 0 && <span>
              <EmptyResponse iconClassName={'w-10! h-10!'} containerClassName={'h-40!'}/>
            </span>
          }
          {options.map((opt) => (
            <SelectItem
              key={String(opt.id)}
              value={String(opt.id)}
              className="data-[highlighted]:bg-[#FEF2E6] data-[state=checked]:bg-[#FEF2E6]"
            >
              {withPictures && (
                <>
                  {opt.url ? (
                    <img className="w-6 h-6 rounded-full" src={`${opt.url}`} />
                  ) : (
                    defaultIcon
                  )}
                </>
              )}
              {t(opt.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DropdownSelect
