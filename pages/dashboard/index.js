import React from 'react'
import Dashboard  from "../../components/Dashboard";
import LoginTempComponent from '../../components/LoginTempComponent';

function Main() {
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