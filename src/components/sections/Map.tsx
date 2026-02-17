import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import GoogleMapReact from "google-map-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Marker = ({ lat, lng }: { lat: number; lng: number }) => (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <FaMapMarkerAlt size={30} color="red" />
    </div>
);

const MapComponent = () => {
    const defaultProps = {
        center: {
            lat: -34.6037,
            lng: -58.3816,
        },
        zoom: 11,
    };

    const googleMapsApiKey = "";

    return (
        <div style={{ height: "300px", width: "100%" }}>
            {googleMapsApiKey ? (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapsApiKey }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <Marker lat={-34.6037} lng={-58.3816} />
                </GoogleMapReact>
            ) : (
                <div className="flex justify-center items-center h-full text-red-500 font-bold">
                    Google Maps API Key is missing
                </div>
            )}
        </div>
    );
};

export default MapComponent; 