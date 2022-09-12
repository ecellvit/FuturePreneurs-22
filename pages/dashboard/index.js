import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Dashboard from "../../components/TeamDashboard/Dashboard.jsx";
import LoginTempComponent from '../../components/LoginTempComponent';
import NavigationBar from '../../components/NavigationBar.jsx';
import { Router, useRouter } from 'next/router.js';

function Main() {
    // if session is not logged in dont show dashboard.
    const router = useRouter();
    const {data:session} = useSession();

    useEffect(()=>{
      if (router.isReady){
        if (!session){
            router.push("/")
        }
      }
    }, [session, router])

    return (
        <div className='main'>
            <NavigationBar/>
            <Dashboard/>
        </div>
    )
}

export default Main