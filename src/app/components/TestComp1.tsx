// Test_Comp1.js
'use client'
import React, { useState } from 'react';
import { useLocationContext } from '../context';

const Test_Comp1: React.FC = () => {
  const { setLocation } = useLocationContext();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    localStorage.setItem('location', JSON.stringify({latitude: latitude, longitude: longitude}))
    setLatitude(''); // Clear the input after submission
    setLongitude(''); // Clear the input after submission
  };

  return (
    <form className='flex gap-[8px]' onSubmit={handleSubmit}>
      <input
        type="number"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Enter latitude"
      />
      <input
        type="number"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Enter longitude"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Test_Comp1;