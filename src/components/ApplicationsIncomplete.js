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
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function ApplicationsIncomplete() {
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

					details.push(detail.data());
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

	return (
		<div>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<a href="/dashboard">
								<img src={Logo} alt="logo" width="100" className="logo" />
							</a>
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
			<hr />

			<br />
			<br />
			<br />
			<br />
			<h2 className="studentDetailsSection">Your Applications :</h2>

			<input
				type="text"
				placeholder="search"
				value={searchTerm}
				onChange={getSearchTerm}
				className="searchBar"
				ref={inputEl}
			/>

			{/* Application details with table */}

			<table className="studentTable">
				<tr className="tableRow">
					<th className="headingRow">Student Name</th>

					<th className="headingRow">Citizenship</th>
					<th className="headingRow">Course</th>
					<th className="headingRow">Application Status</th>
					{/* <th className="headingRow">
		Application Date Created
	</th>
	<th className="headingRow">
		Shortlisted University
	</th> */}
				</tr>

				{searchTerm.length < 1 ? (
					details.map((detail) =>
						detail.applicationStatus == "Incomplete" ? (
							<tr className="tableRow">
								<td className="headingRow">{detail.studentName}</td>

								<td className="headingRow"> {detail.citizenship}</td>
								<td className="headingRow"> {detail.studentCourse}</td>
								<td className="headingRow"> {detail.applicationStatus}</td>
								<td>
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
								</td>
							</tr>
						) : null,
					)
				) : (
					<>
						{" "}
						{searchResults.map((detail) =>
							detail.applicationStatus == "Incomplete" ? (
								<tr className="tableRow">
									<td className="headingRow">{detail.studentName}</td>
									<td className="headingRow">{detail.studentEmail}</td>
									<td className="headingRow">{detail.studentPhone}</td>
									<td className="headingRow"> {detail.citizenship}</td>
									<td className="headingRow"> {detail.studentCourse}</td>
									<td className="headingRow"> {detail.applicationStatus}</td>
									<td>
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
									</td>
								</tr>
							) : null,
						)}
					</>
				)}
			</table>
		</div>
	);
}

export default ApplicationsIncomplete;
