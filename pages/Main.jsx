import React from 'react'
import MyDashboard from '../components/MyDashboard'
import Navbar from '../components/Navbar'
import "../styles/main.css"


function Main({ item }) {


    return (
        <div className='main'>
            <Navbar />
            <div className='heading'>
                <h1>FUTUREPRENEURS</h1>
            </div>
            <MyDashboard />
        </div>
    )
}

export default Main