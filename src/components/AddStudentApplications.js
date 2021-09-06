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
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';


const AddStudentApplications = (props) => {
	const { currentUser } = useContext(AuthContext);
	const [counselorName, setCounselorName] = useState("");
	const [counselorEmail, setCounselorEmail] = useState("");
	const [counselorPhone, setCounselorPhone] = useState("");

	const [candidateName, setCandidateName] = useState("");
	const [candidateEmail, setCandidateEmail] = useState("");
	const [candidatePhone, setCandidatePhone] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [gender, setGender] = useState("");
	const [candidateCity, setCandidateCity] = useState("");
	const [candidateState, setCandidateState] = useState("");
	const [disability, setDisability] = useState("");

	const [programName, setProgramName] = useState("");
	const [programCode, setProgramCode] = useState("");

	const [citizenshipStatus, setCitizenshipStatus] = useState("");
	const [citizenshipCountry, setCitizenshipCountry] = useState("");
	const [birthCountry, setBirthCountry] = useState("");
	const [passportStatus, setPassportStatus] = useState("");

	const [address, setAddress] = useState("");
	const [altaddress, setAltAddress] = useState("");

	const [qualificationName, setQualificationName] = useState("");
	const [qualificationProviderName, setQualificationProviderName] =
		useState("");
	const [qualificationProviderCountry, setQualificationProviderCountry] =
		useState("");
	const [completedStudy, setCompletedStudy] = useState("");

	const [englishProficient, setEnglishProficient] = useState("");

	const [workExperience, setWorkExperience] = useState("");

	const [accomodationService, setAccomodationService] = useState("");

	const [underEighteen, setUnderEighteen] = useState("");
	const [studentName, setStudentName] = useState("");
	console.log(props.location.state);
	const [details, setDetails] = useState("");
	const [counselorDetails, setCounselorDetails] = useState("");

	const location = useLocation();
	const history = useHistory();
	useEffect(() => {
		firebaseConfig
			.firestore()
			.collection("counselor")
			.doc(currentUser.uid)
			.collection("studentDetails")
			.doc(props.location.state.detail)

			.get()
			.then((snapshot) => {
				console.log(snapshot.data());
				setDetails(snapshot.data());
				setCandidateName(snapshot.data().studentName);
				setCandidateEmail(snapshot.data().studentEmail);
				setCandidatePhone(snapshot.data().studentPhone);
				setDateOfBirth(snapshot.data().dateOfBirth);
				setCandidateCity(snapshot.data().studentCity);
				setCitizenshipCountry(snapshot.data().country);
				setCounselorEmail(currentUser.email);

				console.log("name", candidateName);

				console.log("country", details.country);

				console.log("details", details);
			});

		firebaseConfig
			.firestore()
			.collection("counselor")
			.doc(currentUser.uid)
			.get()
			.then((snapshot) => {
				setCounselorDetails(snapshot.data());
				setCounselorName(snapshot.data().counselor_name);
			});
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		setCounselorEmail(counselorEmail);
		setCounselorName(counselorName);
		setCounselorPhone(counselorPhone);

		setCandidateName(candidateName);
		setCandidateEmail(candidateEmail);
		setCandidatePhone(candidatePhone);
		setDateOfBirth(dateOfBirth);
		setGender(gender);
		setCandidateState(candidateState);
		setCandidateCity(candidateCity);
		setDisability(disability);

		setProgramName(programName);
		setProgramCode(programCode);

		setCitizenshipStatus(citizenshipStatus);
		setCitizenshipCountry(citizenshipCountry);
		setBirthCountry(birthCountry);
		setPassportStatus(passportStatus);

		setAddress(address);
		setAltAddress(altaddress);

		setQualificationName(qualificationName);
		setQualificationProviderCountry(qualificationProviderCountry);
		setQualificationProviderName(qualificationProviderName);
		setCompletedStudy(completedStudy);

		setEnglishProficient(englishProficient);

		setWorkExperience(workExperience);

		setAccomodationService(accomodationService);

		setUnderEighteen(underEighteen);

		try {
			const db = firebaseConfig.firestore();
			var currentUser = firebaseConfig.auth().currentUser;

			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				.collection("studentApplications")
				.add({
					applicationStatus: "ApplicationFormFilled",
					counselorPhone: counselorPhone,
					counselorName: counselorName,
					counselorEmail: counselorEmail,

					candidateEmail: candidateEmail,
					candidateName: candidateName,
					candidatePhone: candidatePhone,
					dateOfBirth: dateOfBirth,
					gender: gender,

					candidateState: candidateState,
					disability: disability,

					programCode: programCode,
					programName: programName,

					//		citizenshipCountry:citizenshipCountry,
					citizenshipStatus: citizenshipStatus,
					birthCountry: birthCountry,
					passportStatus: passportStatus,

					address: address,
					altaddress: altaddress,

					qualificationProviderName: qualificationProviderName,
					qualificationProviderCountry: qualificationProviderCountry,
					qualificationName: qualificationName,
					completedStudy: completedStudy,

					englishProficient: englishProficient,

					workExperience: workExperience,

					accomodationService: accomodationService,

					underEig: underEighteen,
				});

			db.collection("counselor")
				.doc(currentUser.uid)
				.collection("studentDetails")
				.doc(props.location.state.detail)
				
				.update({
					applicationStatus: "In Progress",
				});

			console.log("student added");
			history.push({
				pathname: "/studentapplications",
				detail: props.location.state.detail,
				state: { detail: props.location.state.detail },
			});
			// console.log(currentStudent);
			// console.log(currentUser.DisplayName);
			// console.log(currentUser.password);

			// db.collection("counselor").doc(currentUser.uid).set({
			// 	uid: currentUser.uid,
			// 	counselor_name: currentUser.displayName,
			// 	counselor_email: currentUser.email,
			// });
		} catch (error) {
			alert(error);
		}
	}

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
<br/><br/><br/><br/>
			<div>
				<section className="signup">
					<div className="container mt-5">
						<div className="signup-form">
							<h2 className="AddStudentTitle">
								Applying for {props.location.state.univ} :
							</h2>
							<div className="AddStudentformBody">
								<form className="addStudentFormBody" onSubmit={handleSubmit}>
									<h3 className="AddStudentTitle">Agent Details</h3> <hr />
									<input
										className="AddStudentInput"
										type="text"
										name="counselorName"
										placeholder="Counselor Name"
										counselorName={counselorName}
										value={counselorName}
										onChange={(e) => setCounselorName(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="counselorEmail"
										placeholder="Counselor Email"
										counselorEmail={counselorEmail}
										value={counselorEmail}
										onChange={(e) => setCounselorEmail(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										pattern="[789][0-9]{9}"
										name="counselorPhone"
										placeholder="Counselor Phone"
										counselorPhone={counselorPhone}
										value={counselorPhone}
										onChange={(e) => setCounselorPhone(e.target.value)}
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Personal Information</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="candidateName"
										placeholder="Student Name"
										candidateName={candidateName}
										value={candidateName}
										onChange={(e) => setCandidateName(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="email"
										name="candidateEmail"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
										placeholder="Candidate Email"
										candidateEmail={candidateEmail}
										value={candidateEmail}
										onChange={(e) => setCandidateEmail(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="candidatePhone"
										pattern="[789][0-9]{9}"
										placeholder="Candidate Phone"
										candidatePhone={candidatePhone}
										value={candidatePhone}
										onChange={(e) => setCandidatePhone(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
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
										className="AddStudentInput"
										type="text"
										name="candidateState"
										placeholder="Candidate State"
										candidateState={candidateState}
										value={candidateState}
										onChange={(e) => setCandidateState(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="candidateCity"
										placeholder="Candidate City"
										candidateCity={candidateCity}
										value={candidateCity}
										onChange={(e) => setCandidateCity(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="gender"
										placeholder="Male / Female / Transgender"
										gender={gender}
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="disability"
										placeholder="Does the candidate have any kind of disability?"
										disability={disability}
										value={disability}
										onChange={(e) => setDisability(e.target.value)}
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Program Selection</h3> <hr />
									<input
										className="AddStudentInput"
										type="text"
										name="programName"
										placeholder="Name of the Program"
										programName={programName}
										value={programName}
										onChange={(e) => setProgramName(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="programCode"
										placeholder="Program Code"
										programCode={programCode}
										value={programCode}
										onChange={(e) => setProgramCode(e.target.value)}
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">
										Citizenship Information
									</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="citizenshipStatus"
										placeholder="Status Of Citizenship"
										citizenshipStatus={citizenshipStatus}
										value={citizenshipStatus}
										onChange={(e) => setCitizenshipStatus(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="citizenshipCountry"
										placeholder="Citizenship Country"
										citizenshipCountry={citizenshipCountry}
										value={citizenshipCountry}
										onChange={(e) => setCitizenshipCountry(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="birthCountry"
										placeholder="Country of Birth"
										birthCountry={birthCountry}
										value={birthCountry}
										onChange={(e) => setBirthCountry(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="passportStatus"
										placeholder="Does the Candidate have Passport?"
										passportStatus={passportStatus}
										value={passportStatus}
										onChange={(e) => setPassportStatus(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="numberOfCitizenship"
										placeholder="Is the applicant a citizen of more than one country?"
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Contact Details</h3> <hr />
									<input
										className="AddStudentInput"
										type="text"
										name="address"
										placeholder="Address of the Candidate"
										address={address}
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="altAddress"
										placeholder="Alternative Address of Candidate"
										altaddress={altaddress}
										value={altaddress}
										onChange={(e) => setAltAddress(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="pincode"
										placeholder="Pincode"
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Passport Information</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="passportNumber"
										placeholder="Passport Number"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="passportIssueDate"
										placeholder="Passport Issue Date"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="passportExpiryDate"
										placeholder="Passport Expiry Date"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="passportIssueCountry"
										placeholder="Passport Issue Country"
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Education Summary</h3> <hr />
									{/* highest secondary qualification */}
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Country of Education"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Highest level of education"
									/>
									<br />
									<br />
									<h3> Undergraduate </h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Name of the Insritution"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Country of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="State of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="City of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Qualification Achieved/Degree Awarded"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Backlogs"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Primary language of instruction"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Start Date"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="End Date"
									/>
									<br />
									<br />
									<h3>Grade 12th or equivalent</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Name of Board"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Name of Institution"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Country of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="State of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="City of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Qualification Achieved / Degree Awarded"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Score(12th)"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Primary Language of Intruction"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Start Date"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="End Date"
									/>
									<br />
									<br />
									<h3> Grade 10th or equivalent</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Name of Board"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Name of the Institution"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Country of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="State of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="City of Study"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Qualification Achieved / Degree Awarded"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Primary Language of instruction"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Start Date"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="End Date"
									/>
									<br />
									<br />
									{/*
<input
									className="AddStudentInput"
										type="text"
										name="qualificationName"
										placeholder="Name of the highest secondary qualification"
										qualificationName={qualificationName}
										value={qualificationName}
										onChange={(e) =>setQualificationName(e.target.value)}
									/>
<br/><br/>
									<input
									className="AddStudentInput"
										type="text"
										name="qualificationProviderCountry"
										placeholder="Country of the Qualification Provider"
										qualificationProviderCountry={qualificationProviderCountry}
										value={qualificationProviderCountry}
										onChange={(e) => setQualificationProviderCountry(e.target.value)}
									/>
									<br/><br/>

<input
									className="AddStudentInput"
										type="text"
										name="qualificationProviderName"
										placeholder="Name of the Qualification Provider"
										qualificationProviderName={qualificationProviderName}
										value={qualificationProviderName}
										onChange={(e) => setQualificationProviderName(e.target.value)}
									/>
									<br/><br/>

<input
									className="AddStudentInput"
										type="text"
										name="completedStudy"
										placeholder="Is the Above study completed ?"
										completedStudy={completedStudy}
										value={completedStudy}
										onChange={(e) => setCompletedStudy(e.target.value)}
									/>
<br/><br/>

*/}
									<h3 className="AddStudentTitle">English Proficiency</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="englishProficient"
										placeholder="Proficiency Level in English "
										englishProficient={englishProficient}
										value={englishProficient}
										onChange={(e) => setEnglishProficient(e.target.value)}
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Work Experience</h3> <hr />
									<input
										className="AddStudentInput"
										type="text"
										name="workExperience"
										placeholder="Do you have any relevant work experience ? "
										workExperience={workExperience}
										value={workExperience}
										onChange={(e) => setWorkExperience(e.target.value)}
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Name of the Organization & Address"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Position"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Job Profile"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Working from"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Working upto"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Mode of salary"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Currently working here?"
									/>
									<br />
									<br />
									<h3>Tests</h3>
									<h3>GRE</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Quantitative"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Verbal"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Analytical Writing"
									/>
									<br />
									<br />
									<h3>GMAT</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Quantitative"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Verbal"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Analytical Writing"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Integrated Reasoning"
									/>
									<br />
									<br />
									<h3>TOEFL</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Reading"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Listening"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Speaking"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Writing"
									/>
									<br />
									<br />
									<h3>IELTS</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Reading"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Listening"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Speaking"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Writing"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="TRF NO."
									/>
									<br />
									<br />
									<h3>PTE</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Reading"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Listening"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Speaking"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Writing"
									/>
									<br />
									<br />
									<h3>DET</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<h3>SAT</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Reading & Writing"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Math"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Essay"
									/>
									<br />
									<br />
									<h3>ACT</h3>
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Overall Score"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Date of Examination"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Math"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Reading"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Science"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="English"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name=""
										placeholder="Writing"
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">
										Accomodation Services
									</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="accomodationService"
										placeholder="Do you want to avail any accomodation service ? "
										accomodationService={accomodationService}
										value={accomodationService}
										onChange={(e) => setAccomodationService(e.target.value)}
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">
										Background Information
									</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="appliedImmigration"
										placeholder="Has applicant applied for any type of immigration into any country?"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="medicalCondition"
										placeholder="Does applicant suffer from a serious medical condition?"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="visaRefusal"
										placeholder="Has applicant Visa refusal for any country?"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="criminalOffence"
										placeholder="Has applicant ever been convicted of a criminal offence?"
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">Important Contacts</h3> <hr />
									<input
										className="AddStudentInput"
										type="text"
										name="EmergencyName"
										placeholder="Name"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="EmergencyPhone"
										placeholder="Phone"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="EmergencyEmail"
										placeholder="Email"
									/>
									<br />
									<br />
									<input
										className="AddStudentInput"
										type="text"
										name="ApplicantRelation"
										placeholder="Relation with Applicant"
									/>
									<br />
									<br />
									<h3 className="AddStudentTitle">
										Parent / Legal Guardian Details
									</h3>{" "}
									<hr />
									<input
										className="AddStudentInput"
										type="text"
										name="underEighteen"
										placeholder="Are you under 18? "
										underEighteen={underEighteen}
										value={underEighteen}
										onChange={(e) => setUnderEighteen(e.target.value)}
									/>
									<br />
									<br />
									
									 <hr />
									<button className="addStudentSubmitBtn" type="submit">
										Submit the Application
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

export default AddStudentApplications;
