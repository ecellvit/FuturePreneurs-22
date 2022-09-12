import React from "react";
// import "./landingComponents.css";
import { Grid } from "@mui/material";
import yhills from "../../resources/sponsor/IMG_1109.PNG";
import insightone from "../../resources/sponsor/insightone2.png";
import simpliclarify from "../../resources/sponsor/SIMPLICLARIFY TITLE SPONSOR.png";
import SNLogo from "../../resources/sponsor/SN Logo.jpg";
import ventureCatalyst from "../../resources/sponsor/Venture Catalysts Logo Transparent BG.png";
import gsc from "../../resources/sponsor/GSC.jpeg";
import grabon from "../../resources/sponsor/GrabOn_highres_white_primary.png";

export function Section5() {
  return (
    <div className="page_container row Sapling">
      <h4 className="ta_center" style={{ marginTop: "1rem" }}>
        Sponsors
      </h4>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <div className="column ">
            <a href="/" target="blank">
              <img
                src={simpliclarify}
                className="center"
                style={{
                  width: "80%",
                  paddingTop: "10px",
                  background: "black",
                }}
                alt="altimage"
              />
            </a>
            {/* <br /> */}
            {/* <br /> */}
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="column ">
            <a href="https://www.grabon.in/" target="blank">
              <img
                src={grabon}
                className="center"
                style={{
                  width: "310px",
                  paddingTop: "10px",
                  backgroundColor: "#071938",
                }}
                alt="altimage"
              />
            </a>
            <br />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="column">
            <a href="/" target="blank">
              <img
                src={yhills}
                className="center"
                style={{ width: "70%", paddingTop: "10px" }}
                alt="altimage"
              />
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="">
            <a href="/" target="blank">
              <img
                src={insightone}
                className="center"
                style={{ width: "80%", paddingTop: "10px" }}
                alt="altimage"
              />
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="column ">
            <a href="/" target="blank">
              <img
                src={SNLogo}
                className="center"
                style={{ width: "80%", paddingTop: "10px" }}
                alt="altimage"
              />
            </a>
            {/* <br /> */}
            {/* <br /> */}
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="column ">
            <a href="/" target="blank">
              <img
                src={ventureCatalyst}
                className="center"
                style={{ width: "80%", paddingTop: "10px" }}
                alt="altimage"
              />
            </a>
            <br />
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className="column ">
            <a href="/" target="blank">
              <img
                src={gsc}
                className="center"
                style={{ width: "300px", paddingTop: "10px" }}
                alt="altimage"
              />
            </a>
            {/* <br /> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

// export function Section5() {
//   return (
//     <div className="page_container row Sapling">
//       <h4 className="ta_center" style={{ marginTop: "1rem" }}>
//         Sponsors
//       </h4>

//       <div className="column ">
//         <a href="https://wharfstreetstrategies.com/" target="blank">
//           <img
//             src={wss}
//             className="center"
//             style={{ width: "90%", paddingTop: "10px" }}
//             alt="altimage"
//             align="left"
//           />
//         </a>
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://snapchat.com/" target="blank">
//           <img
//             src={snapchat}
//             className="center"
//             style={{ width: "200%", paddingTop: "10px" }}
//             alt="altimage"
//             align="centre"
//           />
//         </a>
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://polygon.technology/" target="blank">
//           <img
//             src={polygon}
//             className="center"
//             style={{ width: "90%", paddingTop: "10px", background: "black" }}
//             alt="altimage"
//             align="right"
//           />
//         </a>
//         <br />
//         <br />
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://www.coca-colaindia.com/" target="blank">
//           <img
//             src={cocacola}
//             className="center"
//             style={{ width: "80%", paddingTop: "10px" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//         <br />
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://portis.io/" target="blank">
//           <img
//             src={portis}
//             className="center"
//             style={{ width: "60%", paddingTop: "10px" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//       </div>
//       <div className="column large2 medium4 small6">
//         <a
//           href="https://www.amdocs.com/products-services#/?utm_source=driveoperationalexcellencepage&utm_medium=amdocswebsite&utm_campaign=driveoperationalexcellencepagerightsectionlink"
//           target="blank"
//         >
//           <img
//             src={xdc}
//             className="center"
//             style={{ width: "25%", paddingTop: "10px" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://www.ixigo.com" target="blank">
//           <img
//             src={ixigo}
//             className="center"
//             style={{ width: "35%", paddingTop: "10px" }}
//             alt="altimage"
//           />
//         </a>

//         <br />
//       </div>
//       <div className="column ">
//         <a href="https://geeksmate.in" target="blank">
//           <img
//             src={geeksmate}
//             className="center"
//             style={{ width: "100%", paddingTop: "20px" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://paytm.com" target="blank">
//           <img
//             src={paytm}
//             className="center"
//             style={{ width: "60%", paddingTop: "10px" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//       </div>
//       <div className="column large2 medium4 small6">
//         <a href="https://yourstory.com/" target="blank">
//           <img
//             src={yourstory}
//             className="center"
//             style={{ width: "60%" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//       </div>

//       <div className="column large2 medium4 small6">
//         <a href="https://intershala.com/" target="blank">
//           <img
//             src={intershala}
//             className="center"
//             style={{ width: "60%" }}
//             alt="altimage"
//           />
//         </a>
//         <br />
//       </div>
//     </div>
//   );
// }
