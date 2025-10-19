import type { FunctionComponent, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface IUploadButtonProps {
    children: ReactNode
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton: FunctionComponent<IUploadButtonProps> = ({ children, handleChange }) => {
    return (
        <Label className="bg-white text-black border-2 shadow-none hover:bg-white cursor-pointer py-2 px-3 rounded-md text-base font-medium">
            <Upload size={18} />
            {children}
            <Input
                id="picture"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={ handleChange }
            />
        </Label>
    )
}

export default UploadButton