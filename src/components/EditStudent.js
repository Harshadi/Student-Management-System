import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import Logo from "../assets/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const EditStudent = (props) => {
	const location = useLocation();
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [studentName, setStudentName] = useState("");
	const [studentEmail, setStudentEmail] = useState("");
	const [studentCity, setStudentCity] = useState("");
	const [studentPhone, setStudentPhone] = useState("");
	const [country, setCountry] = useState("");
	const [dateOfApplication, setDateOfApplication] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [shortlistedUniversity, setShortlistedUniversity] = useState("");
	const [details, setDetails] = useState("");

	useEffect(() => {
		firebaseConfig
			.firestore()
			.collection("counselor")
			.doc(currentUser.uid)
			.collection("studentDetails")
			.doc(props.location.state.detail)

			.get()
			.then((snapshot) => {
				console.log("snapshotdata", snapshot.data());
				setDetails(snapshot.data());

				console.log("details", details);

				setCountry(snapshot.data().country);
				setStudentName(snapshot.data().studentName);
				setStudentEmail(snapshot.data().studentEmail);
				setStudentCity(snapshot.data().studentCity);
				setStudentPhone(snapshot.data().studentPhone);
				setDateOfApplication(snapshot.data().dateOfApplication);
				setDateOfBirth(snapshot.data().dateOfBirth);
				setShortlistedUniversity(snapshot.data().shortlistedUniversity);
			});
	}, []);

	function fetchUserCreds(e) {
		e.preventDefault();
		const db = firebaseConfig.firestore();
		var currentUser = firebaseConfig.auth().currentUser;

		db.collection("counselor")
			.doc(currentUser.uid)
			.collection("studentDetails")
			.doc(props.location.state.detail)
			.get()
			.then((snapshot) => {
				setStudentName(snapshot.studentName);
				console.log(studentName);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setStudentName(studentName);
		setStudentEmail(studentEmail);
		setStudentPhone(studentPhone);
		setStudentCity(studentCity);
		setCountry(country);
		setDateOfApplication(dateOfApplication);
		setDateOfBirth(dateOfBirth);
		setShortlistedUniversity(shortlistedUniversity);

		try {
			const db = firebaseConfig.firestore();
			var currentUser = firebaseConfig.auth().currentUser;

			console.log(currentUser.uid);

			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)

				.set({
					studentName: studentName,
					studentEmail: studentEmail,
					studentCity: studentCity,
					studentPhone: studentPhone,
					country: country,
					dateOfApplication: dateOfApplication,
					dateOfBirth: dateOfBirth,
					shortlistedUniversity: shortlistedUniversity,
				});
			// const db = firebaseConfig.firestore();
			// var currentUser = firebaseConfig.auth().currentUser;

			// console.log(currentUser.uid);

			// 	if(studentName != ""){

			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({
			// 				studentName: studentName,

			// 			});

			// 	}
			// 	if(studentEmail != ""){
			// 			db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({
			// 				studentEmail: studentEmail,

			// 			});

			// 	}
			// 	if(studentCity != ""){

			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({

			// 				studentCity: studentCity,

			// 			});

			// 	}
			// 	if(studentPhone != ""){

			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({

			// 				studentPhone: studentPhone,

			// 			});

			// 	}
			// 	if(country != ""){
			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({

			// 				country: country,

			// 			});

			// 	}
			// 	if(dateOfApplication != ""){

			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({

			// 				dateOfApplication: dateOfApplication,

			// 			});

			// 	}if(dateOfBirth != ""){

			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({

			// 				dateOfBirth: dateOfBirth,

			// 			});

			// 	}
			// 	if(shortlistedUniversity != ""){

			// 		db.collection("counselor")
			// 			.doc(currentUser.uid)
			// 			.collection("studentDetails")
			// 			.doc(props.location.state.detail)

			// 			.set({
			// 				shortlistedUniversity:shortlistedUniversity
			// 			});

			// 	}
		} catch (error) {
			alert(error);
		}

		history.push("/dashboard");
	};

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<img src={Logo} alt="logo" width="100" />
							<Nav.Link href="/references" className="signoutBtn">
								References
							</Nav.Link>
							<Nav.Link
								onClick={() => firebaseConfig.auth().signOut()}
								className="signoutBtn"
							>
								SignOut
							</Nav.Link>

							<Nav.Link href="/dashboard" className="signoutBtn">
								Dashboard
							</Nav.Link>
							<Nav.Link href="/applications" className="signoutBtn">
								Applications
							</Nav.Link>
							<Nav.Link href="/applicants" className="signoutBtn">
								Applicants
							</Nav.Link>
							<Nav.Link href="/dashboard" className="signoutBtn"></Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<header>
				{/* add student form */}

				<div>
					<section className="signup">
						<div className="container mt-5">
							<div className="signup-form">
								<h2 className="signupTitle">Edit your Student Details</h2>

								<div className="formBody">
									<form className="signupFormBody" onSubmit={handleSubmit}>
										<input
											className="signupInput"
											type="text"
											name="studentName"
											placeholder="Student Name"
											studentName={studentName}
											value={studentName}
											onChange={(e) => setStudentName(e.target.value)}
										/>
										<br />
										<br />

										<input
											className="signupInput"
											type="text"
											name="studentEmail"
											placeholder="Student Email"
											studentEmail={studentEmail}
											value={studentEmail}
											onChange={(e) => setStudentEmail(e.target.value)}
										/>
										<br />
										<br />
										<input
											className="signupInput"
											type="text"
											name="studentPhone"
											placeholder="Student Phone number"
											studentPhone={studentPhone}
											value={studentPhone}
											onChange={(e) => setStudentPhone(e.target.value)}
										/>
										<br />
										<br />
										<input
											className="signupInput"
											type="text"
											name="studentCity"
											placeholder="student city"
											studentCity={studentCity}
											value={studentCity}
											onChange={(e) => setStudentCity(e.target.value)}
										/>
										<br />
										<br />
										<input
											className="signupInput"
											type="text"
											name="country"
											placeholder="Interested Country"
											country={country}
											value={country}
											onChange={(e) => setCountry(e.target.value)}
										/>
										<br />
										<br />

										<input
											className="signupInput"
											type="text"
											name="dateOfBirth"
											placeholder="Date of Birth"
											dateOfBirth={dateOfBirth}
											value={dateOfBirth}
											onChange={(e) => setDateOfBirth(e.target.value)}
										/>
										<br />
										<br />

										<input
											className="signupInput"
											type="text"
											name="shortlistedUniversity"
											placeholder="Shortlisted University"
											shortlistedUniversity={shortlistedUniversity}
											value={shortlistedUniversity}
											onChange={(e) => setShortlistedUniversity(e.target.value)}
										/>
										<br />
										<br />

										<button className="signupSubmitBtn" type="submit">
											Save Changes
										</button>
									</form>
								</div>
							</div>
						</div>
					</section>
				</div>
			</header>
		</>
	);
};

export default EditStudent;
