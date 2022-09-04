import React from 'react'
import { useEffect, useState } from "react";
import styles from '../styles/Dashboard.module.css'

function Dashboard() {
    const [teamData, setTeamData] = useState([
        {
            key: 1,
            teamName: "One",
            members: ["raj", "s", "lol"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 2,
            teamName: "Two",
            members: ["rama", "s", "lol"],
            leader: ["rama"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 3,
            teamName: "One",
            members: ["raj", "s", "lol"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 4,
            teamName: "One",
            members: ["raj", "s", "lol"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 5,
            teamName: "One",
            members: ["raj", "s", "lol"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 6,
            teamName: "Two",
            members: ["rama", "s", "lol"],
            leader: ["rama"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 7,
            teamName: "One",
            members: ["raj", "s", "lol"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 8,
            teamName: "One",
            members: ["raj", "s", "lol"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
        {
            key: 9,
            teamName: "One",
            members: ["raj"],
            leader: ["raj"],
            no: "9876543210",
            mail: "meowmeow@cat.com",
        },
    ]);

    return (
        <div>
            <div className={styles.outerContainer}>
                <div className={styles.descContainer}>
                    <div className={styles.bar}>
                        Dashboard
                    </div>
                    <section>
                        <div className={styles.info}>
                            <h2>Dive into the Business Simulation Competition</h2>

                        </div>

                        {teamData.map((team) => {
                            return (

                                (team.members.length) < 4  && (team.key) == 1 &&
                                    <div>
                                        <div className={styles.buttons}>
                                            <button className={styles.teamBtn}>Find Teammates</button>
                                            <button className={styles.startBtn}>Start</button>
                                        </div>
                        
                                    </div> 
                                    
                            )
                        })}

                        {/* {teamData.map((team) => {
                            return (

                                (team.members.length) == 1  && (team.key) == 9 &&
                                    <div>
                                        <div className={styles.teamName}>Team Name: <span className={styles.name}>{team.teamName}</span></div>
                                        <div className={styles.buttons}>
                                            <button className={styles.teamBtn}>Find Teammates</button>
                                            <button className={styles.teamBtn}>Find Team</button>
                                            <button className={styles.startBtn}>Start</button>
                                        </div>
                        
                                    </div> 
                                    
                            )
                        })} */}

                        {teamData.map((team) => {
                            return (

                                (team.members.length) > 0 && (team.key) == 1 &&
                                    <div>
                        
                                        <div className={styles.teamName}>Team Name: <span className={styles.name}>{team.teamName}</span></div>

                                        <div className='teamName'>Team Members:</div>
                                        <div className='members'>
                                            {
                                                team.members[0] && <div>‣ {team.members[0]}</div>
                                            }
                                            {
                                                team.members[1] && <div>‣ {team.members[1]}</div>
                                            }
                                            {
                                                team.members[2] && <div>‣ {team.members[2]}</div>
                                            }
                                            {
                                                team.members[3] && <div>‣ {team.members[3]}</div>
                                            }
                                        </div>
                                    </div> 
                                    
                            )
                        })}

                    </section>
                </div>
            </div>
        </div>
    )
}

export default Dashboard