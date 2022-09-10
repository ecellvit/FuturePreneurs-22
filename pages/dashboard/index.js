import { useSession } from 'next-auth/react';
import React from 'react'
import Dashboard  from "../../components/Dashboard";
import LoginTempComponent from '../../components/LoginTempComponent';

function Main() {
    // if session is not logged in dont show dashboard.
    const {data:session} = useSession();
    if (!session){
        return
    }

    return (
        <div className='main'>
            <div className='heading'>
                <h1>FUTUREPRENEURS</h1>
            </div>
            <LoginTempComponent/>
            <Dashboard/>
        </div>
    )
}

export default Main