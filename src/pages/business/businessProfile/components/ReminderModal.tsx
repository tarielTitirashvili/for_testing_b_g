import { useEffect, useState, type FunctionComponent } from "react"

import type { IBusinessFormData } from "../BusinessProfile"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Clock } from "lucide-react"

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import TextInput from "@/components/shared/inputs/TextInput"

const reminders = [
    {
        value: 0,
        label: "0 წუთი",
    },
    {
        value: 30,
        label: "30 წუთი",
    },
    {
        value: 60,
        label: "1 საათი",
    },
    {
        value: 120,
        label: "2 საათი",
    },
    {
        value: 180,
        label: "3 საათი",
    },
    {
        value: 240,
        label: "4 საათი",
    },
    {
        value: 300,
        label: "5 საათი",
    },
    {
        value: 360,
        label: "6 საათი",
    },
    {
        value: 420,
        label: "7 საათი",
    }
]

interface IReminderModalProps {
    name: keyof IBusinessFormData
    value: number | null
    onChange: (value: number) => void
}

const ReminderModal: FunctionComponent<IReminderModalProps> = ({
    value,
    onChange
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState<number | null>(value ?? null);

    useEffect(() => {
        setSelected(value ?? null);
    }, [value]);

    const handleSelect = (v: number) => setSelected(v);

    const handleSelectSave = () => {
        onChange(selected ?? 0);
        setOpenModal(false);
    };

    const displayValue =
        selected !== null
            ? selected % 60 === 0
                ? `${selected / 60} საათი`
                : `${selected} წუთი`
            : "Select";

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild className="w-full flex-1">
                <TextInput
                    readOnly
                    value={displayValue}
                    InputIcon={Clock}
                    label="რამდენი ხნით ადრე დაიჯავშნოს"
                    className="text-left"
                />
            </DialogTrigger>

            <DialogContent className="max-w-[500px] w-full">
                <DialogHeader>
                    <DialogTitle>წინასწარი ჯავშნის კონტროლი</DialogTitle>
                    <DialogDescription className="hidden" />
                </DialogHeader>

                <div className="reminder_body flex flex-wrap gap-3">
                    {reminders.map((r) => (
                        <div
                            key={r.value}
                            onClick={() => handleSelect(r.value)}
                            className={`p-2.5 rounded-md border-2 cursor-pointer ${
                                selected === r.value
                                    ? "bg-[#EF8700] text-white border-[#EF8700]"
                                    : "border-gray-300"
                            }`}
                        >
                            {r.label}
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <SecondaryButton>Close</SecondaryButton>
                    </DialogClose>

                    <PrimaryButton handleClick={handleSelectSave}>
                        Save
                    </PrimaryButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReminderModal