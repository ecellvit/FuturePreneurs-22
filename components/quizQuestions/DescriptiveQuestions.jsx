import React, { useState,useRef } from 'react'
import styles from '../../styles/DescriptiveQuestions.module.css'

function DescriptiveQuestions({ question, setUserAnswer }) {

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.question}>{question}</div>
        <div className={styles.inputContainer}>
          {/* <input className={styles.inputBox} ref={inputRef} type="text" id="message" name="message" /> */}
          <textarea rows="20" cols="65" className={styles.inputBox} 
          onChange={e => setUserAnswer(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default DescriptiveQuestions
