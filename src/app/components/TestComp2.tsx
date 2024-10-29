// TestComp2.js
'use client'
import React from 'react';
import { useLocationContext } from '../context';

const TestComp2 = () => {
  const { location } = useLocationContext();

  return (
    <div className='bg-blue-300'>
      <p>This is the current Location:</p>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default TestComp2;