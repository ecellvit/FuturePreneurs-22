import styles from '../../styles/Dashboard.module.css'
import TeamMember from './TeamMember'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TeamMembers = ({ teamData, handleMemberLeave }) => {
  const [teamId, setTeamId] = useState(teamData?.teamId?._id)
  const { data: session } = useSession()

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleLeave = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/leave/${teamId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: `${teamData?._id}`,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        })
        handleMemberLeave()
      })
  }

  return (
    <div className={styles.team_member_section}>
      <div className={styles.team_member_section_wrapper}>
        <h2 className={styles.team_name}>
          Team - {teamData?.teamId?.teamName}
        </h2>
        <button
          className={`${styles.remove_team_btn} ${styles.w_button} `}
          onClick={handleLeave}
        >
          Leave Team
        </button>
        <div className={`${styles.team_row} ${styles.align_centre}`}>
          {teamData?.teamId?.members?.map((team) => {
            return (
              <TeamMember
                key={team._id}
                teamName={`${team.firstName} ${team.lastName}`}
                mobileNumber={team.mobileNumber}
                email={team.email}
                teamId={teamId}
                userId={team._id}
                teamRole={team.teamRole}
              ></TeamMember>
            )
          })}
        </div>
      </div>
      <div className={styles.invite_link_container}>
        <div className="copy-area">
          <button
            className={`${styles.btngroup} ${styles.glow_on_hover}`}
            onClick={() =>
              openInNewTab('https://chat.whatsapp.com/LNZVaG2PndRFuQFyCJUDGD')
            }
          >
            Join WhatsApp Group
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamMembers
