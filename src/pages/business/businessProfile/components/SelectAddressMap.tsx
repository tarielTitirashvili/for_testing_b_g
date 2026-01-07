import { useState, type FunctionComponent } from "react";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import TextInput from "@/components/shared/inputs/TextInput"

import axios from "axios";
import { t } from "i18next";

interface IBusinessAddress {
    name?: string
    locales: {
        name: string
        languageId: number
    }[]
    latitude: number
    longitude: number
}

interface ISelectAddressMapProps {
    onSelect: (address: IBusinessAddress) => void
    value: IBusinessAddress | null
    error?: string
}

const SelectAddressMap: FunctionComponent<ISelectAddressMapProps> = ({ onSelect, error, value }) => {

    const defaultCenter = { lat: 41.7151, lng: 44.8271 };

    const generateDefaultValue = value?.latitude ? { lat: value.latitude, lng: value.longitude } : null;

    const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(generateDefaultValue);
    const [address, setAddress] = useState<string>(value?.locales?.[0]?.name || "");
    const [openModal, setOpenModal] = useState<boolean>(false)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "",
    });

    const containerStyle = {
        width: "100%",
        height: "400px",
    };


    // Temporary without google api key
    const handleMapClick = async (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelected({ lat, lng });

        try {
            const res = await axios.get(
                `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=692a1aa339f32006593380rnq9cd76e`
            );

            setAddress((res.data.display_name).split(',').slice(0,3).join(','));
        } catch {
            console.log("err");
        }
    };

    const handleSave = () => {
        if (!selected || !address) return;

        onSelect({
            name: address,
            locales: [{ name: address, languageId: 1 }],
            latitude: selected.lat,
            longitude: selected.lng,
        });

        setOpenModal(false)
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger
                className={`border-2 rounded-md border-[#EBEBEB] flex items-center justify-between w-full h-12 text-base p-2 text-[#6C6C6C] text-left cursor-pointer ${
                    error && "border-red-500"
                }`}
            >
                {t("businessProfile.required.openMap")}
                <img className="-rotate-90" src="/public/assets/images/arrow_down.svg" alt="arrow" />
            </DialogTrigger>

            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}

            <DialogContent className="max-w-[500px] w-full p-0" showCloseButton={false}>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={selected || defaultCenter}
                        zoom={8}
                        onClick={handleMapClick}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            fullscreenControl: false,
                            mapTypeControl: false,
                            clickableIcons: false,
                        }}
                    >
                        {selected && <Marker position={selected} />}
                    </GoogleMap>
                ) : (
                    <p>Loading...</p>
                )}

                <div className="map_select-bottom px-3 pb-3 flex flex-col gap-5">
                    <TextInput
                        value={
                            selected ? address : ''
                        }
                        readOnly
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>
                                {t("bookings.button.close")}
                            </SecondaryButton>
                        </DialogClose>

                        <PrimaryButton handleClick={handleSave}>
                            {t("bookings.button.save")}
                        </PrimaryButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default SelectAddressMap