import React from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Sign from '../../components/Sign'
import NavigationBar from '../../components/NavigationBar'
import Cookies from 'js-cookie'

function JoiningIdPage() {

  const router = useRouter()
  const { joiningId } = router.query

  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (joiningId) {
      Cookies.set('user', joiningId, {
        path: '/',

      })
      if (status !== 'loading' && status === 'unauthenticated') {
        // router.push('/api/auth/signin')
        signIn('google', { callbackurl: `/join-team-link/${joiningId}` })
      }
    }
  }, [status,joiningId])

  return (
    <div>
      <NavigationBar />
      {session ? <Sign /> : 'nothing'}
    </div>
  )
}

export default JoiningIdPage
