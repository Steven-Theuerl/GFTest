'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/accountButton.module.css';

interface User {
    image: string; // Optional, as it might not be present
    name: string;
    email: string;
}

interface Session {
    user: User;
}

export default function AccountButton({ session }: {session: Session}) {
    const [menuClosed, setMenuClosed] = useState(true);
  
    return (    
        <div>
            <Image 
                width='32' 
                height='32' 
                src={session?.user?.image || 'Failed to Load'} 
                alt="User  Avatar" 
                style={{ borderRadius: '4px' }}
                onClick={() => setMenuClosed(!menuClosed)}
            />
            <div className={menuClosed ? styles.closedMenu : styles.openMenu}>
                <Link className={styles.superSexyButton} href='/dashboard'>Dashboard</Link>
                <button className={styles.superSexyButton} type='submit'>Sign Out</button>
            </div>
        </div>
    );
}