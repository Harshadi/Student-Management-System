import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Details } from "@material-ui/icons";
import References from "./References";
import "./style.css";
import Logo from "../assets/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const ViewStudent = (props) => {
	const location = useLocation();
	const history = useHistory();
	// const { currentUser } = useContext(AuthContext);
	const [studentName, setStudentName] = useState("");
	const [studentEmail, setStudentEmail] = useState("");
	const [studentCity, setStudentCity] = useState("");
	const [studentPhone, setStudentPhone] = useState("");
	const [country, setCountry] = useState("");
	const [dateOfApplication, setDateOfApplication] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [shortlistedUniversity, setShortlistedUniversity] = useState("");
	const [details, setDetails] = useState([]);

	useEffect(() => {
		console.log(props.location.state.detail);

		try {
			const db = firebaseConfig.firestore();
			var currentUser = firebaseConfig.auth().currentUser;

			//  db.collection("counselor")
			//   .doc(currentUser.uid)
			//   .collection("studentDetails")
			//   .where( props.location.state.detail)
			//   .onSnapshot((snapshot) => {
			//     setDetails(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));
			//   });
			// console.log(details)
			console.log(props.location.state.detail);
			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.get()
				.then((snapshot) => setDetails(snapshot.data()), console.log(details));

			// db.collection("counselor")
			//   .doc(currentUser.uid)
			//   .collection("studentDetails")
			//   .doc(props.location.state.detail)
			//  .collection()
			//  .get()

			//  .then((snapshot) => {
			// 	snapshot.docs.forEach((detail) => {
			// 		let currentID = detail.id;
			// 		let appObj = { ...detail.data(), ["id"]: currentID };
			// 		details.push(appObj);

			// 		details.push(detail.data());
			// 	});
			// 	setDetails(details);
			// 	 console.log(details);
			// });
		} catch (error) {
			alert(error);
		}
		// console.log(props.location.state.detail);
	}, []);

	return (
		<div>
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

			<br />
			<br />
			<br />
			<br />
			<hr />
			<br />
			<br />
			<div>
				<div style={{ display: "flex", marginLeft: 10 }}>
					<h5 style={{ marginLeft: 30 }}>
						<a href="/view">Applicant Details</a>
					</h5>
					<h5 style={{ marginLeft: 150 }}>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/studentapplications",
									detail: props.location.state.detail,
									state: { detail: props.location.state.detail },
								})
							}
						>
							Application form
						</a>
					</h5>
					<h5 style={{ marginLeft: 150 }}>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/attachments",
									detail: props.location.state.detail,
									state: { detail: props.location.state.detail },
								})
							}
						>
							Attachments
						</a>
					</h5>

					<h5 style={{ marginLeft: 150 }}>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/paymenthistory",
									detail: props.location.state.detail,
									state: { detail: props.location.state.detail },
								})
							}
						>
							Payments
						</a>
					</h5>
					<h5 style={{ marginLeft: 150 }}>Status History</h5>
					<h5 style={{ marginLeft: 150 }}>News</h5>

					<h5 style={{ marginLeft: 150 }}>Messages</h5>
				</div>
				<br />
				<br />
				<br />
				<table>
					<tr>
						<td>Student Name</td>
						<td>{details.studentName}</td>
					</tr>

					<tr>
						<td>Student Email</td>
						<td>{details.studentEmail}</td>
					</tr>

					<tr>
						<td>Application Status</td>
						<td>{details.applicationStatus}</td>
					</tr>

					<tr>
						<td>Citizenship</td>
						<td>{details.citizenship}</td>
					</tr>

				{/*	<tr>
						<td>Date of Application</td>
						<td>{details.dateOfApplication}</td>
					</tr>

				*/}
					<tr>
						<td>DOB</td>
						<td>{details.dateOfBirth}</td>
					</tr>

			{/*		<tr>
						<td>Student City</td>
						<td>{details.studentCity}</td>
					</tr>
				
					<tr>
						<td>Course</td>
						<td>{details.studentCourse}</td>
					</tr>
			*/}

					<tr>
						<td>Student Phone Number</td>
						<td>{details.studentPhone}</td>
					</tr>
				</table>

				<br />
			</div>
		</div>
	);
};

export default ViewStudent;
