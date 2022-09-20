import React from "react";
import styles from "../../styles/Landingr.module.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Footer = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`${styles.footer_section}`}>
      <div className={styles.foot_col_1}>
        <div className={styles.logo_div}>
          <img
            src="ecell-logo-min.png"
            width="334"
            sizes="(max-width: 479px) 89vw, (max-width: 767px) 334px, 21vw"
            className={styles.footer_img}
          />
        </div>
        <div className={styles.line_footer}></div>
        <div className={styles.link_container}>
          <div className={styles.link_div}>
            <a
              href="https://www.facebook.com/ecellvit/"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img src="fb.svg" width="30.5" />
            </a>
          </div>
          <div className={styles.link_div}>
            <a
              href="https://twitter.com/ecell_vit"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img src="twitter.svg" width="29.5" />
            </a>
          </div>
          <div className={styles.link_div}>
            <a
              href="https://in.linkedin.com/company/ecellvitvellore"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img src="linkedin.svg" width="31.5" />
            </a>
          </div>
          <div className={styles.link_div}>
            <a
              href="https://www.instagram.com/ecell_vit/?hl=en"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <img src="insta.svg" width="29.5" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.page_container}>
        <div className={styles.footer_pages}>
          {/* <a href="#" className={styles.link_page}>
            Timeline
          </a>
          <a href="#" className={styles.link_page}>
            About
          </a>
          <a href="#" className={styles.link_page}>
            Home
          </a>
        </div>
        <div className={styles.footer_pages_2}>
          <a href="#" className={styles.link_page}>
            Register
          </a>
          <a href="#" className={styles.link_page}>
            Sponsors
          </a> */}
        </div>
      </div>
      <div className={styles.profiles}>
        <h1 className={styles.title}>Developed and designed by:</h1>
        <Stack className={styles.team} direction="row" spacing={2}>
          <a onClick={() => openInNewTab("https://github.com/anjy7")}>
            <Avatar
              className={styles.zoom}
              alt="anjy7"
              src="https://github.com/anjy7.png"
            />
          </a>
          <a onClick={() => openInNewTab("https://github.com/pratyush3124")}>
            <Avatar
              className={styles.zoom}
              alt="pratyush"
              src="https://github.com/pratyush3124.png"
            />
          </a>
          <a onClick={() => openInNewTab("https://github.com/KapadiaNaitik")}>
            <Avatar
              className={styles.zoom}
              alt="Naitik"
              src="https://github.com/KapadiaNaitik.png"
            />
          </a>
          <a onClick={() => openInNewTab("https://github.com/sai-sreekhar")}>
            <Avatar
              className={styles.zoom}
              alt="sai"
              src="https://github.com/sai-sreekhar.png"
            />
          </a>
          <a
            onClick={() => openInNewTab("https://github.com/Chiranjeev-droid")}
          >
            <Avatar
              className={styles.zoom}
              alt="Chiranjeev"
              src="https://github.com/Chiranjeev-droid.png"
            />
          </a>
          <a onClick={() => openInNewTab("https://github.com/nitishramaraj")}>
            <Avatar
              className={styles.zoom}
              alt="nitish"
              src="https://github.com/nitishramaraj.png"
            />
          </a>
          <a onClick={() => openInNewTab("https://github.com/anjy7")}>
            <Avatar
              className={styles.zoom}
              alt="Cindy Baker"
              src="https://www.linkedin.com/in/anjaneya-gupta.png"
            />
          </a>
        </Stack>
      </div>
      <div className={styles.contact_card_container}>
        <div className={styles.contact_card}>
          <img src="call.svg" width="15" className={styles.contact_img} />
          <div className={styles.contact_text}>+91 9606819078</div>
        </div>
        <div className={styles.contact_card}>
          <img src="mail.svg" width="20" className={styles.contact_img} />
          <div className={styles.contact_text}>helloecellvit@gmail.com</div>
        </div>
        <div className={styles.contact_card}>
          <img src="mail.svg" width="20" className={styles.contact_img} />
          <a href="https://ecellvit.com/">
            <div className={styles.contact_text}>www.ecellvit.com</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
