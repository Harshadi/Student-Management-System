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
import Applications from "./Applications";

const AddPaymentHistory = (props) => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	console.log(props.location.state);
	const [paymentDate, setPaymentDate] = useState("");
	const [paymentAmount, setPaymentAmount] = useState("");
	const [paymentMode, setPaymentMode] = useState("");
	const [applicationStatusId, setApplicationStatusId] = useState("");
	const [applicationStatusDetails, setApplicationStatusDetails] = useState([]);

	const location = useLocation();

	useEffect(() => {
		firebaseConfig
			.firestore()
			.collection("counselor")
			.doc(currentUser.uid)
			.collection("studentDetails")
			.doc(props.location.state.detail)
			.collection("studentApplications")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((detail) => {
					let applicationstatusid = detail.id;
					setApplicationStatusId(detail.id);
					let appObj = { ...detail.data(), ["id"]: applicationstatusid };
					applicationStatusDetails.push(appObj);

					applicationStatusDetails.push(detail.data());
				});
				setApplicationStatusDetails(applicationStatusDetails);
				console.log(applicationStatusDetails);
			});
		console.log("id", applicationStatusDetails);
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		setPaymentDate(paymentDate);
		setPaymentAmount(paymentAmount);
		setPaymentMode(paymentMode);

		try {
			const db = firebaseConfig.firestore();
			var currentUser = firebaseConfig.auth().currentUser;
			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.collection("studentPaymentHistory")
				.add({
					paymentDate: paymentDate,
					paymentAmount: paymentAmount,
					paymentMode: paymentMode,
				});

			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.update({
					applicationStatus: "complete",
				});

			applicationStatusDetails.map((applicationStatusDetail) => {
				console.log("eachstatus", applicationStatusDetail.applicationStatus);
				db.collection("counselor")
					.doc(currentUser.uid)
					.collection("studentDetails")
					.doc(props.location.state.detail)
					.collection("studentApplications")

					.doc(applicationStatusDetail.id)
					.update({
						applicationStatus: "PaymentFormFilled",
					});
			});

			alert("Payment Details Added Successfully");
			console.log("payment added");
			history.push({
				pathname: "/paymenthistory",
				detail: props.location.state.detail,
				state: { detail: props.location.state.detail },
			});
		} catch (err) {
			console.log(err);
		}
	}
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

							<Nav.Link href="/applications" className="signoutBtn">
								Applications
							</Nav.Link>
							<Nav.Link href="/applicants" className="signoutBtn">
								Applicants
							</Nav.Link>
							<Nav.Link href="/dashboard" className="signoutBtn">
								Dashboard
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<div>
				<section className="signup">
					<div className="container mt-5">
						<div className="signup-form">
							<h2 className="AddStudentTitle">Add Payment Details</h2>
							<div className="AddStudentformBody">
								<form className="addStudentFormBody" onSubmit={handleSubmit}>
									<input
										className="AddStudentInput"
										type="text"
										name="paymentDate"
										placeholder="Date of the payment done"
										paymentDate={paymentDate}
										value={paymentDate}
										onChange={(e) => setPaymentDate(e.target.value)}
									/>
									<br />
									<br />

									<input
										className="AddStudentInput"
										type="text"
										name="paymentAmount"
										placeholder="Amount of the payment done"
										paymentAmount={paymentAmount}
										value={paymentAmount}
										onChange={(e) => setPaymentAmount(e.target.value)}
									/>
									<br />
									<br />

									<input
										className="AddStudentInput"
										type="text"
										name="paymentMode"
										placeholder="Mode of the payment done"
										paymentMode={paymentMode}
										value={paymentMode}
										onChange={(e) => setPaymentMode(e.target.value)}
									/>
									<br />
									<br />

									<button className="addStudentSubmitBtn" type="submit">
										Submit the Payment Details
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default AddPaymentHistory;
