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
import {withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },


  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


	return (
		<div>


<AppBar position="fixed">
  <Toolbar>
    
    <Typography  variant="h6" style={{flexGrow: 1}}>
    <a style={{color: 'white'}} href="/dashboard"> Dashboard</a>
    </Typography>
 <Typography  variant="h6" style={{flexGrow: 1}}>
    <a style={{color: 'white'}} href="/applicants"> Applicants</a>
    </Typography>
 <Typography  variant="h6" style={{flexGrow: 1}}>
    <a style={{color: 'white'}} href="/applications"> Applications</a>
    </Typography>

<Typography  variant="h6" style={{flexGrow: 1}}>
    <a style={{color: 'white'}} href="/references">References</a>
    </Typography>
<Typography  variant="h6" style={{flexGrow: 1}}>
    <a style={{color: 'white'}} onClick={() => firebaseConfig.auth().signOut()}> SignOut</a>
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
			</Navbar> */}

			<br />
			<br />
			<br />
			<br />
			
			<br />
			<br />

 <Button variant="contained" color="primary" onClick={() => history.goBack()} style={{float: 'right'}}>
        Back
      </Button>
<br />
			
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
				 <TableContainer component={Paper}>
      <Table style={{minWidth: 700}} aria-label="customized table">
<TableBody>

					<StyledTableRow >
						<StyledTableCell component="th" scope="row">Student Name</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.studentName}</StyledTableCell>
					</StyledTableRow >

					<StyledTableRow >
						<StyledTableCell component="th" scope="row">Student Email</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.studentEmail}</StyledTableCell>
					</StyledTableRow >

					<StyledTableRow >
						<StyledTableCell component="th" scope="row">Application Status</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.applicationStatus}</StyledTableCell>
					</StyledTableRow >

					<StyledTableRow >
						<StyledTableCell component="th" scope="row">Citizenship</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.citizenship}</StyledTableCell>
					</StyledTableRow >

				{/*	<StyledTableRow >
						<StyledTableCell component="th" scope="row">Date of Application</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.dateOfApplication}</StyledTableCell>
					</StyledTableRow >

				*/}
					<StyledTableRow >
						<StyledTableCell component="th" scope="row">DOB</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.dateOfBirth}</StyledTableCell>
					</StyledTableRow >

			{/*		<StyledTableRow >
						<StyledTableCell component="th" scope="row">Student City</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.studentCity}</StyledTableCell>
					</StyledTableRow >
				
					<StyledTableRow >
						<StyledTableCell component="th" scope="row">Course</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.studentCourse}</StyledTableCell>
					</StyledTableRow >
			*/}

					<StyledTableRow >
						<StyledTableCell component="th" scope="row">Student Phone Number</StyledTableCell>
						<StyledTableCell component="th" scope="row">{details.studentPhone}</StyledTableCell>
					</StyledTableRow >
				   </TableBody>
      </Table>
    </TableContainer>

				<br />
			</div>
		</div>
	);
};

export default ViewStudent;
