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
// import Table from 'react-bootstrap/Table'
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


const Dashboard = () => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const inputEl = useRef("");
	const [incompleteStatus, setIncompleteStatus] = useState(0);
	const [completeStatus, setCompleteStatus] = useState(0);
	const [inProgressStatus, setInProgressStatus] = useState(0);
	
	const [applications, setApplications] = useState([]);
	const [statusArray, setStatusArray] = useState([]);
	const [count, setCount] = useState(0);
	const [demo, setDemo] = useState([]);
	const [studentId, setStudentId] = useState([]);

	var complete = 0;
	var incomplete = 0;
	var inProgress = 0;
	const [com, setCom] = useState(0);
	const [incom, setIncom] = useState(0);
	const [inprog, setInprog]= useState(0);



	useEffect(() => {
		const applications = [];
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

				//  details.map((detail)=>{
				// 	firebaseConfig
				// 	.firestore()
				// 	.collection("counselor")
				// 	.doc(currentUser.uid)
				// 	.collection("studentDetails")
				// 	.doc(detail.id)
				// 	.collection('studentApplications')
				// 	.get()
				// 	.then((snapshot) => {
				// 		snapshot.docs.forEach((detail) => {
				// 			let currentID = detail.id;
				// 			let appObj = { ...detail.data(), ["id"]: currentID };
				// 			applications.push(appObj);

				// 			applications.push(detail.data());
				// 			console.log("abc", detail.data().applicationStatus)
				// 			if(detail.data().applicationStatus=="PaymentFormFilled"){
				// 				complete = complete+1

				// 			}
				// 			completeFinal=complete
				// 			console.log("mno",completeFinal)
				// 		});
				// 		setApplications(applications);

				// 	})

				//  })
			});

		// applications.map((application)=>(
		// 	console.log("per app",application)
		//  ))
		// console.log("applications inside useEffect",applications);

		// console.log("arry", statusArray)

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

						applications.push(detail.data());
						console.log("abc", detail.data().applicationStatus);
						
					});
					setApplications(applications);

					console.log(count);
				});
		});

		console.log(applications);
		
		console.log(count);
	}, []);



useEffect(() => {
		const item = [];

		details.map((detail) => {
			console.log(detail.id);
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
						//         item.push(appObj);

						item.push(detail.data().applicationStatus);
						// console.log(item)
						setStudentId(item);
					});

					//             console.log('insidethen', studentId);
					// console.log(item)
				});

			// console.log('outsidethen', item)
		});

		setDemo(item);
		console.log("2nd useeddect", demo);
	}, [details]);

	useEffect(() => {
    const timer = setTimeout(() => {
      demo.forEach((element) => {
        if (element === "PaymentFormFilled") {
      //    console.log(element);
          complete = complete + 1;
         // console.log(complete);
          setCom(complete);
        }
	else if(element === 'ApplicationFormFilled'){
		incomplete = incomplete +1
		setIncom(incomplete)
	}
	else if(element === 'AttachmentsFormFilled'){
	
	inProgress= inProgress +1
	setInprog(inProgress)
	}
      });


    }, 1000);
    return () => clearTimeout(timer);
  });





	// Start the fetch operation as soon as
	// the page loads

	// function editBtnClick((detail) {
	// 	history.push("/editstudent");
	// })

	// function deleteBtnClick(detail) {
	// 	console.log(detail.id);
	// }

	function handleUserClick() {
		history.push("/adduser");
	}
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

			{/* <Navbar bg="light" expand="lg" style={{ backgroundColor: "#40E0D0" }}>
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

			{/* <button
				className="signoutBtn"
				onClick={() => history.push('/references')}
			>
				References
			</button>
			<button
				className="signoutBtn"
				onClick={() => firebaseConfig.auth().signOut()}
			>
				Sign out
			</button> */}

	<a href="/dashboard">
	<img src={Logo} alt="logo" width="100" className="logo" style={{marginLeft: 70, marginTop: 100}} />
	</a>
			<h1 className="welcomeText">Welcome</h1>

			<h3 className="userMail">{currentUser.email}</h3>

			<br />

			{/* <a href="./adduser" onClick={handleUserClick} className="addStudentBtn">
				Add Student
			</a> */}
			<h2 className="studentDetailsSection">Applications By Status</h2>
			<br />

			{/* 
<input type="text" placeholder="search" value={searchTerm} onChange={getSearchTerm} 
className="searchBar"
ref={inputEl}

/> */}

			{/* student details with table */}

			{/* {
console.log("applications",applications),


statusArray.map((application)=>{
console.log("application inside render",application)
	if(application=="PaymentFormFilled"){
		complete = complete +1
		console.log("inside complete",complete)
		
		}
	
else if(application=="AttachmentsFormFilled"){
inProgress =inProgress+1
console.log("inside inprogress",inProgress)

}
else if(application=="applicationFormFilled"){
	incomplete=incomplete+1 

	console.log("inside if",incomplete)
	}

  })
,
console.log("complete",complete)

}  

			{
				(details.map((detail) =>
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

								applications.push(detail.data());
								console.log("abc", detail.data().applicationStatus);
								if (detail.data().applicationStatus == "PaymentFormFilled") {
									complete = complete + 1;
								}
								completeFinal = complete;
								console.log("mno", completeFinal);
							});
							setApplications(applications);
						}),
				),
				console.log("countinside", completeFinal))
			}

			{console.log("countoutside", applications)}

			<table striped bordered hover className="studentTable">
				 
				<tr className="tableRow">
					<th className="headingRow">Application Status</th>
					<th className="headingRow">Number of Applications</th>
					<th className="headingRow">View</th>
				</tr>
				<tr>
					<td>Complete</td>
					<td>
						
						{com}
					</td>
					<td>
						<a href="/applicationscomplete">View</a>
					</td>
				</tr>

				<tr>
					<td>Incomplete</td>
					<td>{incom}</td>
					<td>
						<a href="/applicationsincomplete">View</a>
					</td>
				</tr>
				<tr>
					<td>In Progress</td>
					<td>{inprog}</td>
					<td>
						<a href="/applicationsinprogress">View</a>
					</td>
				</tr>
			</table>



*/}


 <TableContainer component={Paper}>
      <Table style={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Application Status</StyledTableCell>
            <StyledTableCell align="right">Number of Applications</StyledTableCell>
            <StyledTableCell align="right">View</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
         
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Complete
              </StyledTableCell>
              <StyledTableCell align="right"> {com}</StyledTableCell>
              <StyledTableCell align="right">
<a href="/applicationscomplete">View</a>
</StyledTableCell>
             
            </StyledTableRow>

 <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Incomplete
              </StyledTableCell>
              <StyledTableCell align="right"> {incom}</StyledTableCell>
              <StyledTableCell align="right">
<a href="/applicationsincomplete">View</a>
</StyledTableCell>
             
            </StyledTableRow>

 <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                In Progress
              </StyledTableCell>
              <StyledTableCell align="right"> {inprog}</StyledTableCell>
              <StyledTableCell align="right">
<a href="/applicationsinprogress">View</a>
</StyledTableCell>
             
            </StyledTableRow>
         
        </TableBody>
      </Table>
    </TableContainer>








		</div>
	);
};

export default Dashboard;
