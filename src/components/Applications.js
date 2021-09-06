import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
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

function Applications() {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	const [application, setApplication] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const inputEl = useRef("");
	const applications = [];
	const [final, setFinal] = useState([]);
	useEffect(() => {
		const details = [];

		firebaseConfig
			.firestore()
			.collection("counselor")
			.doc(currentUser.uid)
			.collection("studentDetails")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((detail) => {
					let currentID = detail.id;
					let appObj = { ...detail.data(), ["id"]: currentID };
					details.push(appObj);

					//     details.push(detail.data());
				});
				setDetails(details);
				// console.log(details);
			});
	}, []);

	useEffect(() => {
		details.map((detail) => {
			firebaseConfig
				.firestore()
				.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(detail.id)
				.collection("studentApplications")
				.get()
				.then((snapshot) => {
					snapshot.docs.forEach((detail) => {
						let currentID = detail.id;
						let appObj = { ...detail.data(), ["id"]: currentID };
						applications.push(appObj);

						//     applications.push(detail.data());
					});
				});
			setApplication(applications);
		});
		console.log(applications);
	}, [details]);

	if (!currentUser) {
		return <Redirect to="/login" />;
	}

	const getSearchTerm = () => {
		setSearchTerm(inputEl.current.value);
		if (searchTerm !== "") {
			const newStudentList = details.filter((detail) => {
				return Object.values(detail)
					.join(" ")
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			});
			setSearchResults(newStudentList);
		} else {
			setSearchResults(details);
		}
	};




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
			<h2 className="studentDetailsSection">Your Applications :</h2>
 <Button variant="contained" color="primary" onClick={() => history.goBack()} style={{float: 'right'}}>
        Back
      </Button>
<br />
			
			<br />
			<br />
			<input
				type="text"
				placeholder="search"
				value={searchTerm}
				onChange={getSearchTerm}
				className="searchBar"
				ref={inputEl}
			/>

			{/* Application details with table */}

			 <TableContainer component={Paper}>
      <Table style={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
					<StyledTableCell>Student Name</StyledTableCell>

					<StyledTableCell>Citizenship</StyledTableCell>
					<StyledTableCell>Course</StyledTableCell>
					<StyledTableCell>Application Status</StyledTableCell>
					<StyledTableCell></StyledTableCell>
					
				 </TableRow>
        </TableHead>
        <TableBody>

				{searchTerm.length < 1 ? (
					details.map((detail) => (
						<StyledTableRow >
							<StyledTableCell component="th" scope="row">{detail.studentName}</StyledTableCell>

							<StyledTableCell component="th" scope="row">{detail.citizenship}</StyledTableCell>
							<StyledTableCell component="th" scope="row">{detail.studentCourse}</StyledTableCell>
							<StyledTableCell component="th" scope="row"> {detail.applicationStatus}</StyledTableCell>
							<StyledTableCell component="th" scope="row">
								<a
									onClick={(event) =>
										firebaseConfig
											.firestore()
											.collection("counselor")
											.doc(currentUser.uid)
											.collection("studentDetails")
											.doc(detail.id)
											.get()
											.then(() => {
												console.log(detail.id);
												history.push({
													pathname: "/view",
													detail: detail.id,
													state: { detail: detail.id },
												});
											})
									}
								>
									View
								</a>
							</StyledTableCell>
						 </StyledTableRow>
					))
				) : (
					<>
						{" "}
						{searchResults.map((detail) => (
							<StyledTableRow >
								<StyledTableCell component="th" scope="row">{detail.studentName}</StyledTableCell>
								<StyledTableCell component="th" scope="row">{detail.studentEmail}</StyledTableCell>
								<StyledTableCell component="th" scope="row">{detail.studentPhone}</StyledTableCell>
								<StyledTableCell component="th" scope="row"> {detail.citizenship}</StyledTableCell>
								<StyledTableCell component="th" scope="row">{detail.studentCourse}</StyledTableCell>
								<StyledTableCell component="th" scope="row">{detail.applicationStatus}</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									<a
										onClick={(event) =>
											firebaseConfig
												.firestore()
												.collection("counselor")
												.doc(currentUser.uid)
												.collection("studentDetails")
												.doc(detail.id)
												.get()
												.then(() => {
													console.log(detail.id);
													history.push({
														pathname: "/view",
														detail: detail.id,
														state: { detail: detail.id },
													});
												})
										}
									>
										View
									</a>
								</StyledTableCell>
							</StyledTableRow >
						))}
					</>
				)}
			 </TableBody>
      </Table>
    </TableContainer>
		</div>
	);
}

export default Applications;
