import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Add, Details } from "@material-ui/icons";

import References from "./References";
import "./style.css";
import Logo from "../assets/logo.png";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";

import {withStyles,  makeStyles } from '@material-ui/core/styles';
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


function Applicants() {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const inputEl = useRef("");
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

					//         details.push(detail.data());
				});
				setDetails(details);
				console.log(details);
			});
	}, []);

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
<div style={{flex: 1, flexDirection: 'row'}}>
		<div>	<h2 className="studentDetailsSection">Your Applicants :</h2></div>
		<div>	 <Button variant="contained" color="primary" onClick={() => history.goBack()} style={{float: 'right'}}>
        Back
      </Button> </div>
</div>
<br />
			
			<br />
			<br />

			<div style={{ textAlign: "center" }}>
				<h4>
					{" "}
					<a href="/adduser">Add Applicant</a>
				</h4>
				<a href="/adduser">
					<Add />
				</a>
			</div>

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

			{/* Applicants details with table */}

			 <TableContainer component={Paper}>
      <Table style={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
					<StyledTableCell>Student Name</StyledTableCell>
					<StyledTableCell>Student Email</StyledTableCell>
					<StyledTableCell>Student Phone</StyledTableCell>
					<StyledTableCell>Citizenship</StyledTableCell>
					<StyledTableCell>Course</StyledTableCell>
					<StyledTableCell>Application Status</StyledTableCell>
					<StyledTableCell>View</StyledTableCell>
					<StyledTableCell></StyledTableCell>
				 </TableRow>
        </TableHead>
        <TableBody>

				{searchTerm.length < 1 ? (
					details.map((detail) => (
						 <StyledTableRow >
							<StyledTableCell component="th" scope="row">{detail.studentName} </StyledTableCell>

							 <StyledTableCell align="right">{detail.studentEmail}</StyledTableCell>
							 <StyledTableCell align="right">{detail.studentPhone}</StyledTableCell>
							 <StyledTableCell align="right"> {detail.citizenship}</StyledTableCell>
							 <StyledTableCell align="right">{detail.studentCourse}</StyledTableCell>
							 <StyledTableCell align="right">{detail.applicationStatus}</StyledTableCell>
							 <StyledTableCell align="right">
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
							 <StyledTableCell align="right">
								{" "}
								<EditIcon
									className="editIcon"
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
													pathname: "/editstudent",
													detail: detail.id,
													state: { detail: detail.id },
												});
											})
									}
								/>
								<DeleteIcon
									className="deleteIcon"
									onClick={(event) =>
										firebaseConfig
											.firestore()
											.collection("counselor")
											.doc(currentUser.uid)
											.collection("studentDetails")
											.doc(detail.id)
											.delete()
									}
								/>
							</StyledTableCell>
						  </StyledTableRow>
					))
				) : (
					<>
						{" "}
						{searchResults.map((detail) => (
							 <StyledTableRow >
								<StyledTableCell align="right">{detail.studentName}</StyledTableCell>
								<StyledTableCell align="right">{detail.studentEmail}</StyledTableCell>
								<StyledTableCell align="right">{detail.studentPhone}</StyledTableCell>
								<StyledTableCell align="right"> {detail.citizenship}</StyledTableCell>
								<StyledTableCell align="right">{detail.studentCourse}</StyledTableCell>
								<StyledTableCell align="right">{detail.applicationStatus}</StyledTableCell>
								<StyledTableCell align="right">
									{" "}
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
								<StyledTableCell align="right">
									{" "}
									<EditIcon
										className="editIcon"
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
														pathname: "/editstudent",
														detail: detail.id,
														state: { detail: detail.id },
													});
												})
										}
									/>
									<DeleteIcon
										className="deleteIcon"
										onClick={(event) =>
											firebaseConfig
												.firestore()
												.collection("counselor")
												.doc(currentUser.uid)
												.collection("studentDetails")
												.doc(detail.id)
												.delete()
										}
									/>
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

export default Applicants;
