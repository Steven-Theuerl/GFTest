'use client'

import React, {useState, useEffect} from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"; // Import Marker component
import { useLocationContext } from "../context";

const TestComp3 = () => {
    const { location, setLocation } = useLocationContext();
    const [mapKey, setMapKey] = useState(Date.now()); // State to force re-render
  
    const latitude = location.latitude;
    const longitude = location.longitude;
  
  
    useEffect(() => {
      setMapKey(Date.now());
    }, [location]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <Map
        key={mapKey}
        style={{ width: '500px', height: '375px' }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={4}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <Marker
          position={{ lat: latitude, lng: longitude }}
          title="Location Marker"
        />
      </Map>
    </APIProvider>
  );
}

export default TestComp3;