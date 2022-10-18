import React, { useState, useEffect } from 'react'
import { Widget } from '@typeform/embed-react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Loading from "../components/Loading"

function Round21Page() {
  const [currRound, setcurrRound] = useState(20)
  const [teamId, setTeamId] = useState()
  const { data: session } = useSession()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session) {
      setIsLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            window.location = '/instructions-fp-eight-ecell'
            return
          }
          setIsLoading(false)
          if (data.user.teamId) {
            setTeamId(data.user.teamId._id)
          }
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation:',
            error,
          )
        })
    }
  }, [session])

  useEffect(() => {
    if (session && teamId) {
      setIsLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/nextRounds/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setIsLoading(false)
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            window.location = '/instructions-fp-eight-ecell'
            if (data.message === "Previous Rounds Not Completed") {
              router.push('/instructions-fp-eight-ecell')
            }
            return
          }
          setcurrRound(data.currentRound)
          if (data.currentRound === 28) {
            router.push("/thankyou");
          }
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation:',
            error,
          )
        })
    }
  }, [session, teamId])

  const handleSubmit = () => {
    if (session && teamId) {
      setIsLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/nextRounds/${teamId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          nextRound: currRound + 1,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setIsLoading(false)
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            return
          }
          setcurrRound(data.currentRound)
          if (data.currentRound === 28) {
            router.push("/thankyou");
          }
        })
    }
  }

  return (
    <>
      <ToastContainer />
      {isLoading ? <Loading /> :
        <div style={{ marginTop: "20px" }}>
          <div style={{ textAlign: 'center', color: "white", fontSize: "30px", margin: "40px" }} >
            Round 2
          </div>
          {currRound === 20 && (
            <Widget
              id="lYaIHgCf"
              height={570}
              onReady={() => setIsLoading(false)}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 21 && (
            <Widget
              id="BU8GZoEe"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 22 && (
            <Widget
              id="ZykhIrxG"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 23 && (
            <Widget
              id="L6e3Dnim"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 24 && (
            <Widget
              id="aT0eujLI"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 25 && (
            <Widget
              id="OaWblDLr"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 26 && (
            <Widget
              id="bt1dcAfh"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
          {currRound === 27 && (
            <Widget
              id="HqiNeuT1"
              height={570}
              onSubmit={() => {
                handleSubmit()
              }}
            />
          )}
        </div>
      }
    </>
  )
}

export default Round21Page
