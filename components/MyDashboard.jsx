import React from 'react'

function MyDashboard({item}) {
  return (
    <div><div className='outer-container'>
    <div className='desc-container'>
        <div className='bar'>
            Dashboard
        </div>
        <section>
            <div className='info'>
                <h2>Dive into the Business Simulation Competition</h2>
                <div className='buttons'>
                    <button className='teammate-btn'>Find Teammates</button>
                    <button className='start-btn'>Start</button>
                </div>
                <div>Date:</div>

            </div>

            <div className='team-members'>
                <div className='team-name'>Team Name: <span className='name'>{item.teamname}</span></div>

                {item.members.length>0 && <div>

                    <div className='team-name'>Team Members:</div>
                    <div className='members'>
                        {
                            item.members[0] && <div>‣ {item.members[0]}</div>
                        }
                        {
                            item.members[1] && <div>‣ {item.members[1]}</div>
                        }
                        {
                            item.members[2] && <div>‣ {item.members[2]}</div>
                        }
                        {
                            item.members[3] && <div>‣ {item.members[3]}</div>
                        }
                    </div>
                </div>}
            </div>
        </section>
    </div>
</div></div>
  )
}

export default MyDashboard