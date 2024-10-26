import React from 'react';
import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '../../../sanity/client'; // Adjust the path as needed

// Define the query to fetch the document by _id
const QUERY = `* [_type == 'Restaurants' && _id == $id][0] {
  ...
}`;

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  // Fetch the restaurant data using the _id from URL params
  const restaurant = await sanityFetch<SanityDocument>({
    query: QUERY,
    params: { id: params.id }, // Pass the id parameter correctly
  });

  // Log the restaurant object to see its contents
  console.log('Fetched restaurant:', restaurant);

  // Handle the case where no restaurant is found
  if (!restaurant) {
    return <p>Nothing here</p>; // Return a 404 page if the restaurant is not found
  }

  return (
    <div>
      <p>There is something here</p>
      <h1>Name: {restaurant.Name}</h1> {/* Ensure the field names match your Sanity schema */}
      <p>Latitude: {restaurant.Location.lat}</p>
      <p>Longitude: {restaurant.Location.lng}</p>
      <p>Quality: {restaurant.Quality}</p>
      <p>Cost: {restaurant.Cost}</p>
      <p>Safety: {restaurant.Safety}</p>
      {restaurant.Item1 &&
        <div>
          <p>{restaurant.Item1.Name}</p>
          <p>{restaurant.Item1.Quality}</p>
          <p>{restaurant.Item1.Cost}</p>
          <p>{restaurant.Item1.Safety}</p>
        </div>
      }
    </div>
  );
}