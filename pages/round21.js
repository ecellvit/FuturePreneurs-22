import React, { useState } from 'react'
import { Widget } from '@typeform/embed-react'
import { toast, ToastContainer } from "react-toastify";

function Round21Page() {
    const [currRound, setcurrRound] = useState(0)
    return (
        <div>
            {currRound === 0 &&
                <Widget id="lYaIHgCf" height={600} onSubmit={() => {
                    setcurrRound(21)
                }} />
            }
            {currRound === 21 &&
                <Widget id="BU8GZoEe" height={600} onSubmit={() => {
                    console.log("asfd")
                }} />}
        </div>
    )
}

export default Round21Page