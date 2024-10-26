import React from 'react';
import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '../sanity/client';
import { auth, signIn, signOut } from '../../auth';
import Link from 'next/link'

import AccountButton from './components/homePageComponents/AccountButton'

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

  // Check if session is null or if user is not present
  if (!session || !session.user) {
    return (
      <div className={styles.entire_welcomePage}>
      <form className={styles.welcomePageContentContainer} action={async () => {
        "use server";
        await signIn("google");
      }}>
        <div className={styles.topText}>
          <p>Hey!</p>
          <p>Sign in for the best experience!</p>
        </div>
        <button className={styles.superSexyButton} type="submit">Sign in with Google</button>
      </form>
      </div>
    );
  }

  // Fetch testContent only if the user is authenticated
  const allContent = await sanityFetch<SanityDocument[]>({ query: GENERAL_QUERY });

  const restaurantContent = allContent.filter(item => item._type === 'Restaurants');
  const productContent = allContent.filter(item => item._type === 'Products');

  restaurantContent.forEach(item => {
    console.log(`Restaurant ID: ${item._id}`);
  });

  return (
    <div className={styles.Body}>

      <p className='text-center'>Hello, I would like to fetch some data please.</p>  
        <div className={styles.headerUserContainer}>
        <p>
         Congratulations! You are signed in with Google through Auth.js.
        </p>
          <form className='flex gap-2' action={async () => {
            "use server";
            await signOut();
          }}>
          {session.user && <AccountButton session={session as Session} />} {/* Only render if user is defined */}
          </form>
        </div>
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
        <p className={styles.bodyHeader}>Below are all of the entries for Products submitted to the studio</p>
        {
            productContent &&
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
    </div>
  );
}