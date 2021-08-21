import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import "./style.css";
import Logo from "../assets/logo.png";
const LogIn = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		try {
			firebaseConfig
				.auth()
				.signInWithEmailAndPassword(email.value, password.value);
		} catch (error) {
			alert(error);
		}
	};
	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<>
			<br />
			<br />
			<img src={Logo} alt="Logo" className="loginLogo" />
			<h1 className="loginTitle">Log In</h1>
			<div className="formBody">
				<form onSubmit={handleSubmit}>
					<input
						className="loginInput"
						type="email"
						name="email"
						placeholder="ID"
					/>
					<br></br>
					<br />
					<input
						className="loginInput"
						type="password"
						name="password"
						placeholder="Passcode"
					/>
					<br />
					<br />
					<button className="loginSubmitBtn" type="submit">
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default LogIn;
