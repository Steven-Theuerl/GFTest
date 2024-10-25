import React from 'react';
import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '../sanity/client';
import { auth, signIn, signOut } from '../../auth';

import AccountButton from './components/homePageComponents/AccountButton'
import styles from './styles/page.module.css';
import AllContent from './components/homePageComponents/AllContent'

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
      <AllContent allContent={allContent} />
    </div>
  );
}