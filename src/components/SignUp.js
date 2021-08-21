import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";
import "./style.css";

const SignUp = () => {
	const [currentUser, setCurrentUser] = useState();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passcode, setPasscode] = useState("");
	const [mail, setMail] = useState("");
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { email, password } = e.target.elements;
		setName(name);
		setMail(mail);
		setPasscode(passcode);

		console.log(name);

		try {
			const credentials = firebaseConfig
				.auth()
				.createUserWithEmailAndPassword(email.value, password.value);
			setCurrentUser(currentUser);

			setStatus(true);

			const db = firebaseConfig.firestore();
			db.collection("counselor").add({
				name: name,
				mail: mail,
				passcode: passcode,
			});
		} catch (error) {
			alert(error);
		}
	};
	if (status) {
		console.log(currentUser);
		return <Redirect to="/dashboard" />;
	}

	return (
		<>
			<h1 className="signupTitle">Sign Up</h1>
			<div className="formBody">
				<form onSubmit={handleSubmit} className="signupFormBody">
					<input
						className="signupInput"
						type="text"
						name="name"
						placeholder="Name"
						name={name}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<br></br>
					<br></br>{" "}
					<input
						className="signupInput"
						type="email"
						name="email"
						placeholder="Email"
						email={email}
						value={mail}
						onChange={(e) => setMail(e.target.value)}
					/>
					<br></br>
					<br></br>
					<input
						className="signupInput"
						type="password"
						name="password"
						placeholder="Password"
						password={password}
						value={passcode}
						onChange={(e) => setPasscode(e.target.value)}
					/>
					<br></br>
					<br></br>
					<button className="signupSubmitBtn" type="submit">
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default SignUp;
