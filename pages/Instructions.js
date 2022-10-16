import CardComponent from '../components/CardComponent'
import styles from '../styles/Dashboard.module.css'
export default function Instructions() {
  const [round, setRound] = useState()


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/quiz/${TEAM_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(respBody),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className={styles.cardbody}>
    {
     (round === "round1")&&<CardComponent heading={one} />
    }
    {
     (round === "round2")&&<CardComponent heading={two} />
    }
    {
     (round === "round2")&&<CardComponent heading={three}/>
    }

    </div>
  )
}
