'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Clock4 } from 'lucide-react'
import { HALF_HOUR_TIME_INTERVALS } from '@/components/utils/halfHourIntervalsGenerator'

type Props<T> = {
  value: React.ReactNode | string
  options?: T[]
  handleSelectOption: (value: T) => void
}

export function TimePickerDropdown<T extends string | number >(props: Props<T>) {
  const { value, options, handleSelectOption } = props
  // ensure we always operate on a concrete T[]; HALF_HOUR_TIME_INTERVALS is a string[] so assert to T[]
  const computedOptions = (options ?? HALF_HOUR_TIME_INTERVALS) as T[]
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className={`focus-visible:ring-0 focus-visible:ring-offset-0 border-2 w-26 ${
            open ? 'bg-[#FEF2E6] border-[#EF7800]' : 'border-[#EBEBEB]'
          }`}
          variant="outline"
        >
          {value}
          <Clock4 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={-8}
        className="w-26 border-2 border-[#EBEBEB] max-h-[346px]" // dropdown-scrollbar is in index.css
        align="start"
      >
        {computedOptions?.map((option) => {
          return (
            <DropdownMenuItem
              key={option}
              onClick={() => handleSelectOption(option)}
              className="focus:bg-[#FEF2E6] focus:text-[#AE5700] flex justify-center align-middle text-sm font-medium"
            >
              {option}
              <Clock4 className="focus:text-[#AE5700]" />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
