import React from 'react';
import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '../../../sanity/client'; // Adjust the path as needed

// Define the query to fetch the document by _id
const QUERY = `* [_type == 'Products' && _id == $id][0] {
  ...
}`;

export default async function productPage({ params }: { params: { id: string } }) {
  // Fetch the product data using the _id from URL params
  const product = await sanityFetch<SanityDocument>({
    query: QUERY,
    params: { id: params.id }, // Pass the id parameter correctly
  });

  // Log the product object to see its contents
  console.log('Fetched product:', product);

  // Handle the case where no product is found
  if (!product) {
    return <p>Nothing here</p>; // Return a 404 page if the product is not found
  }

  return (
    <div>
      <p>There is something here</p>
      <h1>Name: {product.Name}</h1> {/* Ensure the field names match your Sanity schema */}

      <p>Quality: {product.Quality}</p>
      <p>Cost: {product.Cost}</p>
      <p>Safety: {product.Safety}</p>
      
    
    </div>
  );
}