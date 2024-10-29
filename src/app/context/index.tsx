// context.js
'use client'

import { createContext, useState, useContext, useEffect } from "react";

const LocationContext = createContext<any>(undefined);

export function ContextWrapper({ children }: { children: React.ReactNode; }) {
  const storedLocation = localStorage.getItem('location');
  const initialLocation = storedLocation ? JSON.parse(storedLocation) : { latitude: 0, longitude: 0 };
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    localStorage.setItem('location', JSON.stringify(location));
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}