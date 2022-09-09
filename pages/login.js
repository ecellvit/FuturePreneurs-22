import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'

function login() {

    const { data: session } = useSession();
const [id, setId] = useState()
    const phoneNumberRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (session && phoneNumberRef.current.value.length === 10 ) {

            fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/googleAuth`, {
                method: "POST",
                body: {
                    "token": session.idToken,
                    "email": session.user.email,
                    "name": session.user.name,
                    "photoUrl": session.user.image,
                    "mobileNumber": phoneNumberRef.value
                }   
            })
            .then(data => data.json())
            .then(data => console.log(data))

        }

    }



    return (
        <div>
            <form>
                <label>
                    Phone Number:
                    <input ref={phoneNumberRef} type="text" name="name" />
                </label>

                <button type="submit" onClick={handleSubmit} >Sign in </button>
            </form>

        </div>
    )
}

export default login