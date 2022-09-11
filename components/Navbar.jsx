import React, { useState, useContext } from 'react';
import styles from "../styles/Navbar.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Navbar = (props) => {

	const isLoggedIn = true;
	const logoutHandler = ()=>{console.log("logout here")};

	return (
		<Box className={styles.navMainContainer}>
			<Box className={styles.navSection1}>
				<Grid
					container
					className={styles.logosSection}
					direction="row"
					justifyContent="space-between"
				>
					<Grid
						item
						xs={1}
						className={styles.logosSection_item1}
						justifyContent="flex-start"
					>
					</Grid>
					<Grid
						item
						xs
						zeroMinWidth
						className={styles.logosSection_item2}
						justifyContent="center"
					>
						FUTUREPRENEURS 8.0
					</Grid>
					<Grid
						item
						xs={1.5}
						className={styles.logosSection_item3}
						justifyContent="flex-end"
					>
						{/* <img src={ecellLogo} alt={"E-Cell Logo"} /> */}
					</Grid>
					{(isLoggedIn ||
						localStorage.getItem("isGoogleLogin") === "yes") && (
							<Grid item>
								<Grid
									item
									onClick={logoutHandler}
									style={{
										color: "#0E0E0E",
										textDecoration: "none",
										cursor: "pointer",
										position: "relative",
										left: "100%",
										top: "25%",
									}}
								>
									Logout
								</Grid>
							</Grid>
						)}
				</Grid>
			</Box>
			<Box className={styles.navSection2}>
				<Box className={styles.navbarContainer} margin={0}>
					<Grid
						container
						className={styles.navbarContainer_head}
						sx={{
							display: { xs: "none", lg: "block", sm: "block" },
						}}
					>
					</Grid>
					<div style={{ fontSize: "100px" }}>
					</div>
					<Grid
						container
						spacing={2}
						className={styles.navbarContainer_menu}
						wrap={"nowrap"}
						sx={{
							justifyContent: {
								xs: "center",
								sm: "flex-end",
							},
						}}
					>
						<Grid item>
							<div to="/" style={{ color: "white", textDecoration: "none" }}>
								{props.item1}
							</div>
						</Grid>
						<Grid item>{props.item2}</Grid>
						<Grid item>{props.item3}</Grid>
						{!isLoggedIn ? (
							<Grid item>
								<div
									to="/Login"
									style={{ color: "white", textDecoration: "none" }}
								>
									{props.item4}
								</div>
							</Grid>
						) : null}
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}

export default Navbar;
