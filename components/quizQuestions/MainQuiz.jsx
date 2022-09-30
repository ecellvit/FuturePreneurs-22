import React from "react";
import styles from "../../styles/MainQuiz.module.css";
const MainQuiz = ({ min, sec, startQuiz }) => {
  return (
    <div className={styles.boy}>
      <div className={styles.round_page}>
        <div className={styles.profile_div}>
          <div className={styles.starting}>
            <div className={styles.h1}>
              <h1 className={styles.heading}>Starting In</h1>
            </div>
            <div className={styles.btn}>
              <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
                {min}:{sec}
              </a>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.profile_container}>
            <div className={styles.profile_card}>
              <div className={styles.img}>
                <img src="pic.svg" className={styles.image_2} />
              </div>
              <div className={styles.nam}>
                <div className={styles.name}>Sai Sreekar Godala</div>
              </div>
            </div>
            <div className={styles.profile_card}>
              <div className={styles.img}>
                <img src="pic.svg" className={styles.image_2} />
              </div>
              <div className={styles.nam}>
                <div className={styles.name}>ARUL ARULARUL</div>
              </div>
            </div>
            <div className={styles.profile_card}>
              <div className={styles.img}>
                <img src="pic.svg" className={styles.image_2} />
              </div>
              <div className={styles.nam}>
                <div className={styles.name}>ARUL ARULARUL</div>
              </div>
            </div>
            <div className={styles.profile_card}>
              <div className={styles.img}>
                <img src="pic.svg" className={styles.image_2} />
              </div>
              <div className={styles.nam}>
                <div className={styles.name}>ARUL ARULARUL</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.instructions_div}>
          <div className={styles.round}>
            <div className={styles.text_block}>Round 0</div>
          </div>
          <div className={styles.round}>
            <div className={styles.text_block}>Instructions</div>
          </div>
          <div className={styles.round_instruction}>
            <div className={styles.para}>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididuntut labore et dolore magna aliqua.” The
              purpose oflorem ipsum is to create a natural looking block of text
              (sentence, paragraph, page, etc.) <br />
              thatdoesn&#x27;t distract from the layout.
              <br />
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididuntut labore et dolore magna aliqua.” The
              purpose oflorem ipsum is to create a natural looking block of text
              (sentence, paragraph, page, etc.) thatdoesn&#x27;t distract from
              the layout.
            </div>
          </div>
          <div className={styles.start_btn}>
            <img
              src="startbtn.png"
              loading="lazy"
              width="290px"
              sizes="(max-width: 1919px) 145px, 290px"
              alt=""
              className={styles.image}
            />
            <a
              className={`${styles.btn_txt} ${styles.w_button}`}
              onClick={() => {
                startQuiz();
              }}
            >
              Start Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainQuiz;
