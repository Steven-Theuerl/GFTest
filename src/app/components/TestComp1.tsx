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

  return (
    <div>
      <input id="place-input" type="text" placeholder="Enter a place" />
    </div>
  );
};

export default TestComp1;