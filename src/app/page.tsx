import React from 'react';
import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '../sanity/client';
import { auth, signIn, signOut } from '../../auth';
import Link from 'next/link'

import AccountButton from './components/homePageComponents/AccountButton'

import TestComp1 from './components/TestComp1';
import TestComp2 from './components/TestComp2';
import TestComp3 from './components/TestComp3';

import styles from './styles/page.module.css';


const GENERAL_QUERY = `* | order(name asc)`;

interface User {
  image: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
}

export default async function Home() {
  
  const session = await auth();

  const allContent = await sanityFetch<SanityDocument[]>({ query: GENERAL_QUERY });

  const restaurantContent = allContent.filter(item => item._type === 'Restaurants');
  const productContent = allContent.filter(item => item._type === 'Products');

  const locations = restaurantContent.map(item => ({
    ItemLat: item.Location?.lat, // Ensure the location property exists
    ItemLng: item.Location?.lng, // Ensure the location property exists
    ItemName: item.Name
  }));

  return (
    
    <div className={styles.Body}>


      { /* Header Container */ }
      <div className={styles.headerUserContainer}>
        {session?.user && 
          <p>
            Congratulations! You are signed in with Google through Auth.js.
          </p>
        }
        {session?.user && 
          <form className='flex gap-2' action={async () => {
            "use server";
            await signOut();
          }}>
          <AccountButton session={session as Session} />
          </form>}
        {!session?.user && 
          <form  className='flex justify-end w-full'action={async () => {
            'use server';
            await signIn('google');
          }}>
            <button type='submit'>Sign in!</button>
          </form>}
      </div>

      { /* Body Container */ }
      <div className={styles.Body}>
        <div className='flex flex-col justify-evenly'>
          <div>
            <p className={styles.bodyHeader}>
                Below are all of the entries for Restaurants submitted to the studio
            </p>
            { restaurantContent &&
              <ul className={styles.fetchedContentContainer}>
                  {restaurantContent.map((item) => (
                    <Link key={item._id} href={`/restaurants/${item._id}`} 
                      className={styles.fetchedContentItemContainer}>
                        <h2>Name: {item.Name}</h2>
                        <h3>Quality: {item.Quality}</h3>
                        <h3>Cost: {item.Quality}</h3>
                        <h3>Safety: {item.Quality}</h3>
                    </Link>
                  ))}
              </ul>
            }
          </div>
          <div>
            <p className={styles.bodyHeader}>
              Below are all of the entries for Products submitted to the studio
            </p>
            { productContent &&
              <div className={styles.fetchedContentContainer}>
                {productContent.map((item) => (
                  <Link key={item._id} href={`/products/${item._id}`}>
                    <div className={styles.fetchedContentItemContainer}>
                        <h2>{item.Name}</h2>
                    </div>
                  </Link>))
                }
              </div>
            }
          </div>
        </div>
      </div>
      <div className={styles.mapHouse}>
        <div className='flex flex-col gap-1 mb-1'>
          <TestComp1/>
          <TestComp3 locations={locations}/>
          <TestComp2/>
        </div>
      </div>
    </div>
  );
}