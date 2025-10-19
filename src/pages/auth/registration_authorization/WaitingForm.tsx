import type { FunctionComponent } from "react"

import { Hourglass } from "lucide-react"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import { Link } from "react-router-dom"


const WaitingForm: FunctionComponent = () => {
    return (
        <div className="waiting_form min-h-screen flex flex-col items-center justify-center flex-1 h-full bg-[#EFF0F1] py-2">
            
            <div className="waiting_form-wrapper flex flex-col gap-6 bg-white max-w-[500px] w-full p-6 rounded-md">
                
                <div className="waiting_form-header flex flex-col gap-3">
                    <div 
                        className="waiting_form-icon bg-[#EF7800] text-white rounded-full h-[110px] w-[110px] flex flex-col items-center justify-center mx-auto"
                    >
                        <Hourglass
                            className="wait-rotate-animation"
                            size={45}
                        />
                    </div>
                    
                    <div className="waiting_form-info text-center">
                        <div className="waiting_form-into_title text-xl font-bold">
                            Waiting for confirmation
                        </div>
                        <div className="waiting_form-into_title text-base text-[#6C6C6C] font-normal">
                            After receiving confirmation from the property, you will be automatically logged into Bookit.
                        </div>
                    </div>
                </div>

                <div className="waiting_form-buttons flex flex-col gap-3">
                    <Link to='/'>
                        <SecondaryButton>
                            Main Page
                        </SecondaryButton>
                    </Link>

                    <Link to='/registration' className="registration_link text-center border-t-2 pt-2">
                        Don't Have An Account? <span className="cursor-pointer text-[#EF7800] font-medium">Create An Account</span>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default WaitingForm