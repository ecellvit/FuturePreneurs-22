import React, { useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import TeamMemberLeader from './TeamMemberLeader'
import styles from '../../styles/Dashboard.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../Loading'
import myContext from '../../store/myContext'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from '../modal'
import styles1 from '../../styles/Modal.module.css'

const LeaderDashboard = ({
  teamData,
  handleTeamDelete,
  teamToken,
  handleMemberRemove,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)

  const [teamId, setTeamId] = useState(teamData.teamId._id)
  const [isLoading, setIsLoading] = useState(false)

  const [isCopied, setIsCopied] = useState(false)
  const { data: session } = useSession()

  const myCtx = useContext(myContext)

  const showToastMessage = () => {
    toast('Copied Invite Link to Clipboard!', {
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'toast-message',
    })
  }

  const onCopyText = () => {
    //alert("Copied");
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDelete = () => {
    if (teamData.teamId.members.length === 1) {
      setIsLoading(true)
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team/${teamData.teamId._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
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
            return
          }
          //handleTeamDelete(false)
          myCtx.hasTeamHandler(false);
          setIsLoading(false)
          myCtx.leaderHandler(false)
        })
    } else {
      toast.error('Please remove all team members first', {
        toastId: 'error_team',
      })
    }
  }

  return (
    <div>
      <div className={styles.team_member_section}>
        <div className={styles.team_member_section_wrapper}>
          <p className={styles.team_name}>
            Team Name - {teamData?.teamId?.teamName}
          </p>
          <h2 className={styles.invite_link_container}>
            {/* <label className={styles.label}>Team Link:</label> */}
            {/* <input
              type="text"
              value={`https://fp.ecellvit.com/join-team-link/${teamToken}`}
              placeholder="Type some text here"
              className={styles.input}
              readOnly
            /> */}
            <CopyToClipboard
              text={`https://fp.ecellvit.com/join-team-link/${teamToken}`}
              onCopy={onCopyText}
            >
              <div className="copy-area">
                <button
                  className={`${styles.btnCopy} ${styles.glow_on_hover}`}
                  onClick={showToastMessage}
                >
                  Copy Invite Link
                </button>
              </div>
            </CopyToClipboard>
          </h2>
          <div className={`${styles.team_row} ${styles.align_centre}`}>
            {teamData?.teamId?.members?.map((team) => {
              return (
                <TeamMemberLeader
                  key={team._id}
                  teamName={`${team.firstName} ${team.lastName}`}
                  mobileNumber={team.mobileNumber}
                  email={team.email}
                  teamId={teamId}
                  userId={team._id}
                  handleMemberRemove={handleMemberRemove}
                  teamRole={team.teamRole}
                ></TeamMemberLeader>
              )
            })}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles1['save-button']} ${styles1['button']} ${styles.delete}`}
            onClick={() => (modalOpen ? close() : open())}
          >
            Delete Team
          </motion.button>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {modalOpen && (
              <Modal
                modalOpen={modalOpen}
                handleClose={close}
                text={"Are you sure you want to delete your team?"}
                text1={"This action can't be reversed!!"}
                text2={"Yes I'm sure"}
                deleteTeam={handleDelete}
              />
            )}
          </AnimatePresence>
          <div className={styles.invite_link_container}>
            <div className="copy-area">
              <button
                className={`${styles.btngroup} ${styles.glow_on_hover}`}
                onClick={() =>
                  openInNewTab(
                    'https://chat.whatsapp.com/LNZVaG2PndRFuQFyCJUDGD',
                  )
                }
              >
                Join WhatsApp Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderDashboard
