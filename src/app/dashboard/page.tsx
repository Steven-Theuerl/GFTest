import React from 'react'
import Link from 'next/link'
import {auth} from '../../../auth'

import SubmissionForm from '../components/dashboardComponents/SubmissionForm'

import styles from '../styles/dashboard.module.css'

export default async function Dashboard() {
    const session = await auth()

    const sessionDetails = JSON.stringify(session, null, 2);
    const firstName = session?.user?.name ? session.user.name.split(' ')[0] : 'Guest';
    const email = session?.user?.email ? session.user.email : "...wait we don't have one. You shouldn't be on this page >:(";

    if (!session) {
        return <div>Not logged in</div>
    }

  return (
    <div className='flex flex-col'>
        <Link href='/' className='superSexyButton' replace>Back to Website</Link>
        <pre className={styles.uglyDataContainer}>Here are the details I have about the session: <br/>
            {sessionDetails}
        </pre>
        <div>Hello, {firstName}</div>
        <div>Would you like to receive updates, newsletters, and notifications at 
            <span className='text-blue-500'> {email}?</span>
        </div>
        <SubmissionForm/>
    </div>
  )
}

 