'use client'

import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"; 
import { useLocationContext } from "../context";

const TestComp3 = () => {
    const { location, setLocation } = useLocationContext();
    const [mapKey, setMapKey] = useState(Date.now()); 
  
    const latitude = location?.latitude || 0; // Default to 0 if location is null
    const longitude = location?.longitude || 0; // Default to 0 if location is null
  
    useEffect(() => {
        setMapKey(Date.now());
    }, [location]);

    function mapUpdater(event) {
        const latLng = event.detail.latLng;
        if (latLng) {
            const newLocation = {
                latitude: latLng.lat,
                longitude: latLng.lng
            };
            setLocation(newLocation); // Update the context with the new location
        }
    }

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            <Map
                key={mapKey}
                style={{ width: '500px', height: '325px' }}
                defaultCenter={{ lat: latitude, lng: longitude }} // Set the center based on the current location
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onClick={mapUpdater} // Update location on map click
            >
                <Marker
                    position={{ lat: latitude, lng: longitude }} // Marker position based on current location
                    title="Location Marker"
                />
            </Map>
        </APIProvider>
    );
}

export default TestComp3;