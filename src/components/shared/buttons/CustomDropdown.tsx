import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  children: React.ReactNode
  trigger: React.ReactNode
  className?: string
}

const CustomDropdown = ({ children, trigger, className }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomDropdown
