import React, { useState,useRef } from 'react'
import styles from '../../styles/DescriptiveQuestions.module.css'

function DescriptiveQuestions({handleDescriptivset}) {
  const [question, setQuestion] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  )


  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.question}>{question}</div>
        <div className={styles.inputContainer}>
          {/* <input className={styles.inputBox} ref={inputRef} type="text" id="message" name="message" /> */}
          <textarea rows="20" cols="65" className={styles.inputBox} 
          onChange={e => handleDescriptive(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default DescriptiveQuestions
