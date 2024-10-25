'use client'

import React from 'react'
import { SanityDocument } from 'next-sanity';

import styles from '../../../app/styles/page.module.css'

interface AllContentProps {
    allContent: SanityDocument[];
}

  const HomeBody: React.FC<AllContentProps> = ({ allContent }) => {

    const restaurantContent = allContent.filter(item => item._type === 'Restaurants');
    const productContent = allContent.filter(item => item._type === 'Products');


  return (
    <div className={styles.Body}>
        <p className={styles.bodyHeader}>Below are all of the entries submitted to the studio</p>
        {allContent && 
            <div className={styles.fetchedContentContainer}>
                {allContent.map((item) => (
                    <div key={item._id} className={styles.fetchedContentItemContainer}>
                        <h2>{item.name}</h2>
                    </div>))
                }
            </div>
        }
        <p className={styles.bodyHeader}>Below are all of the entries for Restaurants submitted to the studio</p>
        {
            restaurantContent &&
            <div className={styles.fetchedContentContainer}>
                {restaurantContent.map((item) => (
                    <div key={item._id} className={styles.fetchedContentItemContainer}>
                        <h2>{item.name}</h2>
                    </div>))
                }
            </div>
        }
        <p className={styles.bodyHeader}>Below are all of the entries for Products submitted to the studio</p>
        {
            productContent &&
            <div className={styles.fetchedContentContainer}>
                {productContent.map((item) => (
                    <div key={item._id} className={styles.fetchedContentItemContainer}>
                        <h2>{item.name}</h2>
                    </div>))
                }
            </div>
        }
    </div>
)}

export default HomeBody;