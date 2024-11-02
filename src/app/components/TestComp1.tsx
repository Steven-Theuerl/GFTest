// components/TestComp1.tsx
'use client'

import React, { useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps'; // Ensure you have this import
import { useLocationContext } from '../context'; // Adjust the import path as needed

const TestComp1 = () => {
  const { setLocation } = useLocationContext();
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!placesLib) return;

    const input = document.getElementById('place-input') as HTMLInputElement;
    const autocomplete = new placesLib.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location.toJSON();
        const lat = location.lat || null; // Provide a default value if undefined
        const lng = location.lng || null; // Provide a default value if undefined
        setLocation({ latitude: lat, longitude: lng });
      }
    });
  }, [placesLib, setLocation]);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords; // Altitude can be added here if needed
        const newLocation = { latitude, longitude };
        setLocation(newLocation);
        localStorage.setItem('location', JSON.stringify(newLocation)); // Save to localStorage
      },
  )}

  return (
    <div className='flex flex-col gap-[8px] items-center text-center'>
      <div className='flex items-center bg-yellow-300 w-1/2 rounded-md'>
        <p className='w-full'>
          Please enter any place, city, zip-code, anywhere.
        </p>
      </div>
      <input className='w-3/4 p-1' id="place-input" type="text" placeholder="Enter a place" />
      <button className='bg-green-200 w-1/4 p-1 rounded-md' onClick={getCurrentLocation}>Use Current Location</button>
  </div>
  );
};

export default TestComp1;