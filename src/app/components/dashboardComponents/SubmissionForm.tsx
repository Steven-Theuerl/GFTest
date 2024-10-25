'use client'

import React from 'react'
import { useState } from 'react'
import styles from '../../styles/page.module.css'

export default function SubmissionForm() {

  const [responseMessage, setResponseMessage] = useState('');
  const [restaurantInputValue, setRestaurantInputValue] = useState('');
  const [productsInputValue, setProductsInputValue] = useState('');

  const sanityToken = process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN; // Updated to include NEXT_PUBLIC_
  const projectId = 'tta7nwhf';  // Your Sanity project ID
  const dataset = 'production';    // Your Sanity dataset name

  const url = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`;

  const restaurant_postAPICall = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sanityToken}`
        },
        body: JSON.stringify({
          mutations: [
            { create: {
              _type: 'Restaurants', 
              name: restaurantInputValue 
            } }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const restaurantResponse = await response.json();
      console.log('Success:', restaurantResponse);
      setResponseMessage('Restaurant Submission successful!'); // Optional: Update response message
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error submitting Restaurant data'); // Update response message on error
    }
  };


  const product_postAPICall = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sanityToken}`
        },
        body: JSON.stringify({
          mutations: [
            { create: {
              _type: 'Products', 
              name: productsInputValue 
            } }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const productResponse = await response.json();
      console.log('Success:', productResponse);
      setResponseMessage('Product Submission successful!'); // Optional: Update response message
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error submitting Product data'); // Update response message on error
    }
  };

  const callApi = async () => {
    try {
      const response = await fetch('/api'); // Adjust the path if necessary
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error calling API:', error);
      setResponseMessage('Error calling API');
    }
  };

  return (
    <>
      <div className={styles.submissionFormContainer}>
        <label htmlFor='submissionInput'>Restaurant </label>
        <div className='flex flex-row gap-4 justify-center align-center'>
          <input
            id='submissionInput'
            className={styles.submissionInput}
            type="text"
            name="name"
            value={restaurantInputValue}
            onChange={(e) => setRestaurantInputValue(e.target.value)}
            placeholder="Name"
            required
          />
          <button onClick={restaurant_postAPICall} className={styles.submitButton}>
            Submit
          </button>
        
        </div>
      </div>

      <div className={styles.submissionFormContainer}>
      <label htmlFor='submissionInput'>Product </label>
      <div className='flex flex-row gap-4 justify-center align-center'>
        <input
          id='submissionInput'
          className={styles.submissionInput}
          type="text"
          name="name"
          value={productsInputValue}
          onChange={(e) => setProductsInputValue(e.target.value)}
          placeholder="Name"
          required
        />
        <button onClick={product_postAPICall} className={styles.submitButton}>
          Submit
        </button>
      </div>
   
      </div>
      <div className='self-center'>
          <button onClick={callApi}>Call API</button>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
    </>
  );
}