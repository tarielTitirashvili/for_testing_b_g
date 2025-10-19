import type { FunctionComponent } from "react";

import { Toggle } from "@/components/ui/toggle";

interface IServiceButtonProps {
    service: string;
    isSelected: boolean;
    onToggle: () => void;
}

const ServiceButton: FunctionComponent<IServiceButtonProps> = ({ service, isSelected, onToggle }) => {
    return (
        <Toggle
            pressed={isSelected}
            onPressedChange={onToggle}
            className="rounded-full font-medium border-2 py-2 px-4
                data-[state=on]:bg-[#EF7800]
                data-[state=on]:border-[#EF7800]
                data-[state=on]:text-white
                cursor-pointer"
        >
            {service}
        </Toggle>
    );
};

export default ServiceButton;