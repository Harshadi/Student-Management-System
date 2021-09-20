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
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Applications from "./Applications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const AddPaymentHistory = (props) => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	console.log(props.location.state);
	const [paymentDate, setPaymentDate] = useState(new Date());
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
		console.log(paymentDate);

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
				// db.collection("counselor")
				// .doc(currentUser.uid)
				// .collection("studentDetails")
				// .doc(props.location.state.detail)
				// .collection("studentApplications")
				// .update({
				// 	applicationStatus: 'PaymentFormFilled'
				// });



			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.update({
					applicationStatus: "complete",
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
	const handleChange = (paymentDate) => {
		setPaymentDate(paymentDate);
		console.log(paymentDate);
	};
	return (
		<div>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						<a style={{ color: "white" }} href="/dashboard">
							{" "}
							Dashboard
						</a>
					</Typography>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						<a style={{ color: "white" }} href="/applicants">
							{" "}
							Applicants
						</a>
					</Typography>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						<a style={{ color: "white" }} href="/applications">
							{" "}
							Applications
						</a>
					</Typography>

					<Typography variant="h6" style={{ flexGrow: 1 }}>
						<a style={{ color: "white" }} href="/references">
							References
						</a>
					</Typography>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						<a
							style={{ color: "white" }}
							onClick={() => firebaseConfig.auth().signOut()}
						>
							{" "}
							SignOut
						</a>
					</Typography>
				</Toolbar>
			</AppBar>

			{/* <Navbar bg="light" expand="lg">
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
			</Navbar> */}
			<br />
			<br />
			<br />
			<br />

			<div>
				<section className="signup">
					<div className="container mt-5">
						<div className="signup-form">
							<h2 className="AddStudentTitle">Add Payment Details</h2>
							<div className="AddStudentformBody">
								<form className="addStudentFormBody" onSubmit={handleSubmit}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Grid container justifyContent="space-around">
											<KeyboardDatePicker
												disableToolbar
												variant="inline"
												format="MM/dd/yyyy"
												margin="normal"
												id="date-picker-inline"
												label="Date of the Payment"
												value={paymentDate}
												paymentDate={paymentDate}
												onChange={handleChange}
												KeyboardButtonProps={{
													"aria-label": "change date",
												}}
											/>
										</Grid>
									</MuiPickersUtilsProvider>

									{/* <Calendar
										paymentDate={paymentDate}
										value={paymentDate}
										name="paymentDate"
										onChange={handleChange}
									/> */}

									<br />
									<br />

									<input
										className="AddStudentInput"
										type="text"
										pattern="\d*"
										maxlength="4"
										name="paymentAmount"
										placeholder="Amount of the payment done"
										paymentAmount={paymentAmount}
										value={paymentAmount}
										onChange={(e) => setPaymentAmount(e.target.value)}
									/>
									<br />
									<br />

									{/*		<input
										className="AddStudentInput"
										type="text"
										name="paymentMode"
										placeholder="Mode of the payment done"
										paymentMode={paymentMode}
										value={paymentMode}
										onChange={(e) => setPaymentMode(e.target.value)}
									/> */}

									<br />

									<FormControl style={{ minWidth: 150 }}>
										<InputLabel id="demo-simple-select-helper-label">
											Payment Mode
										</InputLabel>
										<Select
											labelId="demo-simple-select-helper-label"
											id="demo-simple-select-helper"
											value={paymentMode}
											paymentMode={paymentMode}
											onChange={(e) => setPaymentMode(e.target.value)}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={"NEFT"}>NEFT</MenuItem>
											<MenuItem value={"IMPS"}>IMPS</MenuItem>
											<MenuItem value={"Cash /Cheque"}>Cash / Cheque</MenuItem>
										</Select>
										<FormHelperText></FormHelperText>
									</FormControl>
									{/* <Dropdown>
										<Dropdown.Toggle variant="success" id="dropdown-basic">
											Choose mode of payment
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item href="#/action-1">NEFT</Dropdown.Item>
											<Dropdown.Item href="#/action-2">IMPS</Dropdown.Item>
											<Dropdown.Item href="#/action-3">
												Cheque / Cash
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown> */}

									<br />
									<br />

									<button className="addStudentSubmitBtn" type="submit">
										Submit the Payment Details
									</button>
<br/><br/>
<div style={{textAlign: 'center'}}>
 <Button variant="contained" color="primary" onClick={() => history.goBack()} style={{ minWidth: 250}}>
        Back
      </Button>
</div>
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
