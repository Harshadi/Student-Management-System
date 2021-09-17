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
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [urls, setUrls] = useState("");  
  const [ files, setFiles]= useState([])
  
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
        console.log("d", details);
        setDetails(details);
        console.log("details", details);
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

    // var item = storageRef.child(`/images/${props.location.state.detail}`)
    // console.log(item)




const fetchImages = async () => {

    let result = await  storage
          .ref(`images/${props.location.state.detail}`)
          .listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        return Promise.all(urlPromises);

    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        console.log(urls);
    }
    loadImages();




  }, []);

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
    console.log("run", imageAsFile);
  };

  const handleFireBaseUpload = async(e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...

    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    const uploadTask = storage
      .ref(`/images/${props.location.state.detail}/${imageAsFile.name}`)
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
      //  console.log(`${props.location.state.detail}`);
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
   storage
          .ref(`images/${props.location.state.detail}`)
          .child(imageAsFile.name)
          .getDownloadURL()
          .then(async (fireBaseUrl) => {
       //     console.log('pc',fireBaseUrl);
     //    setImageAsUrl(fireBaseUrl);
 await firebaseConfig
        .firestore()
        .collection("counselor")
        .doc(currentUser.uid)
        .collection("studentDetails")
        .doc(props.location.state.detail)
        .collection("studentAttachments")
        .add({
          adimage: fireBaseUrl,
          name: imageAsFile.name,
          type: imageAsFile.type,
          size: imageAsFile.size,
          lastModifiedDate: imageAsFile.lastModifiedDate,
        });
          });
      }
    );

   
      const db = firebaseConfig.firestore();
      var currentUser = firebaseConfig.auth().currentUser;
      console.log("ad", imageAsUrl);
      


//hereeeeeeeee



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
      console.log("url", imageAsUrl);

      history.push({
        pathname: "/attachments",
        detail: props.location.state.detail,
        state: { detail: props.location.state.detail },
      });
    
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
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

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
      <br />
      <br />
      <br />
      {console.log("insidede", details)}
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Last uploaded date</StyledTableCell> */}
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((detail) => (
              <StyledTableRow>
                {/* <StyledTableCell component="th" scope="row">{ new Date(detail.lastModifiedDate)}</StyledTableCell> */}
                <StyledTableCell component="th" scope="row">
                  {detail.size}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {detail.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {detail.type}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <img src={detail.adimage} alt="" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br />
      <br />

      <div style={{ textAlign: "center" }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleImageAsFile}
        />
        <label htmlFor="contained-button-file">
          <Button
            onClick={console.log("hii")}
            variant="contained"
            color="primary"
            component="span"
          >
            Upload
          </Button>
        </label>
        <input
          onChange={handleImageAsFile}
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>

      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFireBaseUpload}
        >
          Upload Document
        </Button>
      </div>
      <br />
      <br />

      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
          style={{ minWidth: 180 }}
        >
          Back
        </Button>
      </div>

      <img src={imageAsUrl} alt="" />

      {/*


			 <form className="formBody" onSubmit={handleFireBaseUpload}>
<input
        accept="image/*"
        style={{display: 'none'}}
        id="contained-button-file"
        multiple
        type="file"
		onChange={console.log('clicked')}
		
      />
      <label htmlFor="contained-button-file">
        <Button
		
		variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <input accept="image/*" style={{display: 'none'}} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton
		onChange={handleImageAsFile}
		color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
				 <input
					className="loginInput"
					type="file"
					onChange={handleImageAsFile}
				/> 
				<br /> <br />
				 <button className="loginSubmitBtn">upload the document</button> 
<Button variant="contained" color="primary">
        Primary
      </Button>
			</form> */}
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
