import React from "react";
import styles from "../../styles/Img.module.css";
const Img = () => {
  return (
    <div className={styles.boy}>
      <div className={styles.round_page}>
        <div className={styles.instructions_div}>
          <div className={styles.top}>
            <div className={styles.round}>
              <div className={styles.que_num}>Q1</div>
            </div>
            <div className={styles.timer}>
              <div className={styles.text_block}>Time Left</div>
              <div className={styles.text_block}>00:00:00</div>
            </div>
          </div>
          <div className={styles.round_instruction}>
            <div className={styles.para}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.” The
              purpose of“Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididuntut labore et dolore magna
              aliqua.” The purpose oflorem ipsum is to create a natural looking
              block of text (sentence, paragraph, page, etc.) thatdoesn&#x27;t
              distract from the layout.
            </div>
            <div className={styles.img_cont}>
              <img
                src="https://uploads-ssl.webflow.com/63195bcc7d1a5fdd8154a6a2/63195bcc7d1a5f14bc54a6bc_kidfortestimonial.png"
                sizes="(max-width: 479px) 100vw, 600px"
                // srcset="https://uploads-ssl.webflow.com/63195bcc7d1a5fdd8154a6a2/63195bcc7d1a5f14bc54a6bc_kidfortestimonial-p-500.png 500w, https://uploads-ssl.webflow.com/63195bcc7d1a5fdd8154a6a2/63195bcc7d1a5f14bc54a6bc_kidfortestimonial-p-800.png 800w, https://uploads-ssl.webflow.com/63195bcc7d1a5fdd8154a6a2/63195bcc7d1a5f14bc54a6bc_kidfortestimonial.png 1024w"
                // alt=""
                className={styles.qimg}
              />
            </div>
            <div className={styles.div_block}>
              <div className={styles.text_block_2}>A</div>
              <div className={styles.text_block_3}>
                <strong className={styles.bold_text}>
                  The value of offers/gifts given to new customers.{" "}
                </strong>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.text_block_2}>A</div>
              <div className={styles.text_block_3}>
                <strong className={styles.bold_text}>
                  The value of offers/gifts given to new customers.{" "}
                </strong>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.text_block_2}>A</div>
              <div className={styles.text_block_3}>
                <strong className={styles.bold_text}>
                  The value of offers/gifts given to new customers.{" "}
                </strong>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.text_block_2}>A</div>
              <div className={styles.text_block_3}>
                <strong className={styles.bold_text}>
                  The value of offers/gifts given to new customers.{" "}
                </strong>
              </div>
            </div>
          </div>
          <div className={styles.type}>
            <div className={styles.start_btn}>
              <img
                src="https://uploads-ssl.webflow.com/63195bcc7d1a5fdd8154a6a2/6332133fc4bc2737d9b97a60_startbtn.png"
                width="290px"
                sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                alt=""
                className={styles.image}
              />
              <a href="#" className={`${styles.btn_txt} ${styles.w_button}`}>
                Next
              </a>
            </div>
            <p className={styles.paragraph}>Note: Multiple choice correct</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Img;
