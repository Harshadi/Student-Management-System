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
import { storage } from "../config.js";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';


const Attachments = (props) => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	const [applicationStatusDetails, setApplicationStatusDetails] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const inputEl = useRef("");
	const [applicationStatusId, setApplicationStatusId] = useState("");

	const allInputs = { imgUrl: "" };
	const [imageAsFile, setImageAsFile] = useState("");
	const [imageAsUrl, setImageAsUrl] = useState(allInputs);

	useEffect(() => {
		const details = [];
		firebaseConfig
			.firestore()
			.collection("counselor")
			.doc(currentUser.uid)
			.collection("studentDetails")
			.doc(props.location.state.detail)
			.collection("studentAttachments")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((detail) => {
					let currentID = detail.id;
					let appObj = { ...detail.data(), ["id"]: currentID };
					details.push(appObj);

			//		details.push(detail.data());
				});
				setDetails(details);
				console.log("details", details);
				details.map((detail) => {
					console.log(Date(detail.lastModifiedDate.nanoseconds));
				});
			});

		//firebaseConfig
		//        .firestore().collection("counselor")
		//      .doc(currentUser.uid)
		//    .collection("studentDetails")
		//  .doc(props.location.state.detail)
		//.collection('applicationstatus')
		//        .get()
		//      .then((snapshot)=>{
		//      snapshot.docs.forEach((detail)=>{
		//              let applicationstatusid = detail.id;
		//		setApplicationStatusId(detail.id)
		//            let appObj = { ...detail.data(), ["id"]: applicationstatusid};
		//          applicationStatusDetails.push(appObj);
		//
		//            applicationStatusDetails.push(detail.data())
		//        });
		//      setApplicationStatusDetails(applicationStatusDetails);
		//    console.log(applicationStatusDetails)
		//  })
		// console.log("id", applicationStatusId)

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

		applicationStatusDetails.map((applicationStatusDetail) => {
			console.log("eachstatus", applicationStatusDetail.applicationStatus);
		});
	}, []);

	console.log(imageAsFile);
	const handleImageAsFile = (e) => {
		const image = e.target.files[0];
		setImageAsFile((imageFile) => image);
	};

	const handleFireBaseUpload = (e) => {
		e.preventDefault();
		console.log("start of upload");
		// async magic goes here...

		if (imageAsFile === "") {
			console.error(`not an image, the image file is a ${typeof imageAsFile}`);
		}
		const uploadTask = storage
			.ref(`/images/${imageAsFile.name}`)
			.put(imageAsFile);

		//initiates the firebase side uploading
		uploadTask.on(
			"state_changed",
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot);
			},
			(err) => {
				//catches the errors
				console.log(err);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage
					.ref("images")
					.child(imageAsFile.name)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						setImageAsUrl((prevObject) => ({
							...prevObject,
							imgUrl: fireBaseUrl,
						}));
					});
			},
		);

		try {
			const db = firebaseConfig.firestore();
			var currentUser = firebaseConfig.auth().currentUser;

			firebaseConfig
				.firestore()
				.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.collection("studentAttachments")
				.add({
					name: imageAsFile.name,
					type: imageAsFile.type,
					size: imageAsFile.size,
					lastModifiedDate: imageAsFile.lastModifiedDate,
					imageUrl: imageAsUrl.imgUrl,
				});

			firebaseConfig
				.firestore()
				.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.update({
					applicationStatus: "In Progress",
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
						applicationStatus: "AttachmentsFormFilled",
					});
			});

			console.log("firestore uploaded");
			alert("File uploaded");

			history.push({
				pathname: "/attachments",
				detail: props.location.state.detail,
				state: { detail: props.location.state.detail },
			});
		} catch (err) {
			console.log(err);
		}
	};

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
			</Navbar> */}

			<br />
			<br />
<br />
			<br />
<br />
			<br /><br />
			<br />

			<table>
				<tr>
					<th>Last uploaded date</th>
					<th>Size</th>
					<th>File Name</th>
					<th>Category</th>
					<th>View</th>
				</tr>
				<tr></tr>
				{details.map((detail) => (
					<tr>
						<td>{Date(detail.lastModifiedDate.nanoseconds)}</td>
						<td>{detail.size}</td>
						<td>{detail.name}</td>
						<td>{detail.type}</td>
						<td>
							<img src={imageAsUrl.imgUrl} alt="image tag" />
						</td>
					</tr>
				))}
			</table>

			<br />
			<br />
			<br />
			<form className="formBody" onSubmit={handleFireBaseUpload}>
				<input
					className="loginInput"
					type="file"
					onChange={handleImageAsFile}
				/>
				<br /> <br />
				<button className="loginSubmitBtn">upload the document</button>
			</form>
			{/*
<img src={imageAsUrl.imgUrl} alt="image tag" />
*/}
			{console.log(imageAsFile)}

			{console.log(props.location.state.detail)}

			{console.log(imageAsFile.lastModifiedDate)}
		</div>
	);
};

export default Attachments;
