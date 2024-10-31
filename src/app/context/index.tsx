// context.js
'use client'

import { APIProvider } from "@vis.gl/react-google-maps";
import { createContext, useState, useContext, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LocationContext = createContext<any>(undefined);

export function ContextWrapper({ children }: { children: React.ReactNode; }) {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });

  useEffect(() => {
    const customLocation = localStorage.getItem('location');
    
    if (customLocation) {
      try {
        const parsedLocation = JSON.parse(customLocation);
        // Check if parsedLocation has the required properties
        if (parsedLocation && typeof parsedLocation.latitude === 'number' && typeof parsedLocation.longitude === 'number') {
          setLocation(parsedLocation);
          return; // Exit early if we found a valid location
        }
      } catch (error) {
        console.error("Error parsing location from localStorage: ", error);
      }
    } 

    // If no valid location in localStorage, get the user's location with permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords; // Altitude can be added here if needed
          const newLocation = { latitude, longitude };
          setLocation(newLocation);
          localStorage.setItem('location', JSON.stringify(newLocation)); // Save to localStorage
        },
        (error) => {
          console.error("Error getting location: ", error);
          const storedLocation = localStorage.getItem('location');
          if (storedLocation) {
            try {
              const parsedStoredLocation = JSON.parse(storedLocation);
              if (parsedStoredLocation && typeof parsedStoredLocation.latitude === 'number' && typeof parsedStoredLocation.longitude === 'number') {
                setLocation(parsedStoredLocation); // Fallback to stored location
              }
            } catch (parseError) {
              console.error("Error parsing stored location: ", parseError);
            }
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      const storedLocation = localStorage.getItem('location');
      if (storedLocation) {
        try {
          const parsedStoredLocation = JSON.parse(storedLocation);
          if (parsedStoredLocation && typeof parsedStoredLocation.latitude === 'number' && typeof parsedStoredLocation.longitude === 'number') {
            setLocation(parsedStoredLocation); // Fallback to stored location
          }
        } catch (parseError) {
          console.error("Error parsing stored location: ", parseError);
        }
      }
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {children}
      </APIProvider>
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}