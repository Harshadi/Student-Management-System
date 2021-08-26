import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";
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


function AddUser() {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [studentName, setStudentName] = useState("");
	const [studentEmail, setStudentEmail] = useState("");
	const [studentPhone, setStudentPhone] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [currentStudent, setCurrentStudent] = useState("");
	const [citizenship, setCitizenship] = useState("");
	const [gender, setGender] = useState("");
	const [details, setDetails] = useState([]);
	const [email, setEmail] = useState([]);
	const [number, setNumber] = useState([]);
	var repeatStatus = false;

	useEffect(() => {
		console.log("inside useeffect");

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
				details.map(
					(detail) => (
						email.push(detail.studentEmail),
						number.push(detail.studentPhone),
						setNumber(number),
						setEmail(email)
					),
				);
				console.log("email", email);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		setStudentName(studentName);
		setStudentEmail(studentEmail);
		setStudentPhone(studentPhone);
		setDateOfBirth(dateOfBirth);
		setCitizenship(citizenship);
		setGender(gender);

		try {
			const db = firebaseConfig.firestore();
			var currentUser = firebaseConfig.auth().currentUser;

			// get student name

			// console.log("includes",studentName.includes(name))
			// console.log(studentName)

			for (var i = 0; i <= email.length; i++) {
				console.log(email);
				console.log(email[i]);
				console.log(email[i] == studentEmail, email[i], studentEmail);

				if (email[i] == studentEmail) {
					repeatStatus = true;
					alert("Student already exists");
					history.push("/applicants");
					break;
				}
			}

			for (var i = 0; i <= number.length; i++) {
				console.log(number);
				console.log(number[i]);
				console.log(number[i] == studentPhone, number[i], studentPhone);

				if (number[i] == studentPhone) {
					repeatStatus = true;
					alert("Student already exists");
					history.push("/applicants");
					break;
				}
			}

			if (repeatStatus == false) {
				console.log("studentname", studentName);

				db.collection("counselor")
					.doc(currentUser.uid)
					.collection("studentDetails")
					.add({
						studentName: studentName,
						studentEmail: studentEmail,
						studentPhone: studentPhone,
						dateOfBirth: dateOfBirth,
						citizenship: citizenship,
						applicationStatus: "Incomplete"
					});

				setCurrentStudent(currentStudent);
				console.log(currentStudent);
				// console.log(currentUser.DisplayName);
				// console.log(currentUser.password);

				db.collection("counselor").doc(currentUser.uid).set({
					uid: currentUser.uid,
					counselor_name: currentUser.displayName,
					counselor_email: currentUser.email,
				});

				alert("Student Details added successfully");
				history.push("/applicants");
			}
		} catch (error) {
			alert(error);
		}
	};
	const handleInputs = (e) => {
		//	studentName = e.target.studentName;
		// studentEmail = e.target.studentEmail;
		// studentCity = e.target.studentCity;
		// studentPhone = e.target.studentPhone;
		// country = e.target.country;
		// dateOfApplication = e.target.DateOfApplication;
		// dateOfBirth = e.target.dateOfBirth;

		setStudentName(studentName);
		console.log(studentName);
	};
	const handleAddStudent = (e) => {
		e.preventDefault();
		console.log(
			studentName,
			studentEmail,
			studentPhone,
			dateOfBirth,
			citizenship,
			gender,
		);
	};

	return (
		<>


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
			<header>
				{/* add student form */}

				<div>
					<section className="signup">
						<div className="container mt-5">
							<div className="signup-form">
								<h2 className="AddStudentTitle" style={{ textAlign: "center" }}>
									Add your Student
								</h2>
								<div className="AddStudentformBody">
									<form className="addStudentFormBody" onSubmit={handleSubmit}>
										<h2
											className="AddStudentTitle"
											style={{ textAlign: "center" }}
										>
											Personal Details
										</h2>
										<input
											className="AddStudentInput"
											type="text"
											name="studentName"
											placeholder="Student Name"
											studentName={studentName}
											value={studentName}
											onChange={(e) => setStudentName(e.target.value)}
											required
										/>
										<br />
										<br />

										<input
											className="AddStudentInput"
											type="text"
											name="citizenship"
											placeholder="Citizenship of Student"
											citizenship={citizenship}
											value={citizenship}
											onChange={(e) => setCitizenship(e.target.value)}
											required
										/>
										<br />
										<br />

										<input
											className="AddStudentInput"
											type="text"
											name="gender"
											placeholder="Gender of Student"
											gender={gender}
											value={gender}
											onChange={(e) => setGender(e.target.value)}
											required
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
											required
										/>
										<br />
										<br />

										<h2
											className="AddStudentTitle"
											style={{ textAlign: "center" }}
										>
											Contact Details
										</h2>

										<input
											className="AddStudentInput"
											type="email"
											pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
											name="studentEmail"
											placeholder="Student Email"
											studentEmail={studentEmail}
											value={studentEmail}
											onChange={(e) => setStudentEmail(e.target.value)}
											required
										/>
										<br />
										<br />
										<input
											className="AddStudentInput"
											type="text"
											name="studentPhone"
											pattern="[789][0-9]{9}"
											placeholder="Student Phone number"
											studentPhone={studentPhone}
											value={studentPhone}
											onChange={(e) => setStudentPhone(e.target.value)}
											required
										/>
										<br />
										<br />

										<button className="addStudentSubmitBtn" type="submit">
											Submit
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
}

export default AddUser;
