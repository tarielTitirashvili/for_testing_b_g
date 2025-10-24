import { useState, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface IPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

const PasswordInput: React.FunctionComponent<IPasswordInputProps> = ({ label, error, ...inputProps }) => {
    const [showPass, setShowPass] = useState<boolean>(false)

    const toggleShowPass = () => {
        setShowPass(prev => !prev)
    }

    return (
        <div className="flex flex-col gap-1.5">
            <span
                className={`text-sm font-medium text-[#242424] ${error && 'text-red-500 font-medium'}`}
            >
                {label}
            </span>
            <div className="input-body-wrapper">
                <div className="relative w-full">
                    <Input
                        type={showPass ? 'text' : 'password'}
                        className={cn(
                            "border-2 rounded-sm border-[#EBEBEB] w-full text-base p-1.5 text-[#6C6C6C]",
                            error && "border-red-500 focus:border-red-500"
                        )}
                        autoComplete="current-password"
                        {...inputProps}
                    />
                    <span
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#AEAEAE] cursor-pointer"
                        onClick={toggleShowPass}
                    >
                        {showPass ? (
                            <img src="/assets/images/input_visible.svg" alt="show" />
                        ) : (
                            <img src="/assets/images/input_hidden.svg" alt="hide" />
                        )}
                    </span>
                </div>
                {error && <span className="text-xs text-red-500 font-medium">{ error }</span>}
            </div>

        </div>
    )
}

export default PasswordInput