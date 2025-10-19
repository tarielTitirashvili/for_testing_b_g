import type { FunctionComponent, InputHTMLAttributes } from "react"

interface ITermsCheckbox extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const TermsCheckbox: FunctionComponent<ITermsCheckbox> = ({ error, ...inputProps }) => {
    return (
        <div className="form_terms">
            <div className="form_terms-checkbox flex items-center gap-1">
                <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#EF7800]"
                    {...inputProps}
                />
                <p className="text-base font-medium">
                    I accept the{" "}
                    <span className="text-[#EF7800] cursor-pointer">
                        Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-[#EF7800] cursor-pointer">
                        Privacy Policy
                    </span>
                </p>
            </div>
            {error && <span className="text-xs text-red-500 font-medium">{ error }</span>}
        </div>
    )
}

export default TermsCheckbox