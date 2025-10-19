import PrimaryButton from "@/components/shared/buttons/PrimaryButton"
import SecondaryButton from "@/components/shared/buttons/SecondaryButton"
import TextInput from "@/components/shared/inputs/TextInput"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState, type FunctionComponent } from "react";

interface IBusinessAddress {
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

const SelectAddressMap: FunctionComponent<ISelectAddressMapProps> = ({ onSelect, error }) => {

    const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);
    const [address, setAddress] = useState<string>('');

    const defaultCenter = { lat: 41.7151, lng: 44.8271 }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "",
    });

    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        const geocoder = new google.maps.Geocoder();
        // Should be changed
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results && results[0]) {
                onSelect({
                    locales: [{ name: results[0].formatted_address, languageId: 1 }],
                    latitude: lat,
                    longitude: lng,
                });
            } else {
                setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
                setSelected({
                    lat,
                    lng
                })
                onSelect({
                    locales: [{ name: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, languageId: 1 }],
                    latitude: lat,
                    longitude: lng,
                });
            }
        });
    }, [onSelect]);

    return (
        <Dialog>
            <DialogTrigger className={`border-2 rounded-sm border-[#EBEBEB] w-full text-base p-2 text-[#6C6C6C] h-10 text-left cursor-pointer ${error && 'border-red-500'}`}>
                { address || "Open Map" }
            </DialogTrigger>
            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
            <DialogContent
                showCloseButton={false}
                className="max-w-[500px] w-full p-0">

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
                    <div className="address">
                        <TextInput
                            value={selected ? `${selected.lat.toFixed(5)}, ${selected.lng.toFixed(5)}` : ""}
                            readOnly
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <SecondaryButton>Close</SecondaryButton>
                        </DialogClose>
                        <PrimaryButton>Save</PrimaryButton>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SelectAddressMap