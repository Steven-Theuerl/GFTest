'use client'

import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"; 
import { useLocationContext } from "../context";


interface Location {
    ItemLat: number; // or string, depending on your data type
    ItemLng: number; // or string
    ItemName: string
}

const TestComp3 = ({locations}:{locations: Location[] }) => {

    const { location, setLocation } = useLocationContext();
    const [mapKey, setMapKey] = useState(Date.now()); 
  
    const latitude = location?.latitude || null; // Default to 0 if location is null
    const longitude = location?.longitude || null; // Default to 0 if location is null
  
    useEffect(() => {
        setMapKey(Date.now());
    }, [location]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function mapUpdater(event: { detail: { latLng: any; }; }) {
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
              {latitude === (0 || null) && longitude === (0 || null) && (
                <div>This box shows if no location was given or specified</div>
            )}
            <Map
                key={mapKey}
                style={{ width: '800px', height: '325px' }}
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
                 {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.ItemLat, lng: location.ItemLng }}
                        title={location.ItemName}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // Change the URL to a different icon image
                       
                          }}
                    />
                ))}
         
            </Map>
        </APIProvider>
    );
}

export default TestComp3;