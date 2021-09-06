import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";

import {withStyles,  makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Img1 from "../assets/BESBI.jpg";
import Img2 from "../assets/ASTON-UNIVERSITY.png";
import Img3 from "../assets/AT-SUNRICE.jpg";
import Img4 from "../assets/AUSTRALIA-CATHOLIC-UNIVERSITY.jpg";
import Img5 from "../assets/CARDIFF-METROPOLITAN-UNIVERSITY.png";
import Img6 from "../assets/CARDIFF-UNIVERSITY.png";
import Img7 from "../assets/CITY-UNIVERSITY-LONDON.png";
import Img8 from "../assets/COLLEGE-AVALON.jpg";
import Img9 from "../assets/COVENTRY-UNIVERSITY-LOGO.png";
import Img10 from "../assets/CRANFEILD-UNIVERSITY.png";
import Img11 from "../assets/DURHAM-UNIVERSITY.png";
import Img12 from "../assets/EU-BUSINESS-SCHOOL.jpg";
import Img13 from "../assets/FLINDERS-UNIVERSITY.jpg";
import Img14 from "../assets/GLION-INSTITUTE.jpg";
import Img15 from "../assets/HERIOT-WATT-UNIVERSITY.jpg";
import Img16 from "../assets/HTMI-LOGO.jpg";
import Img17 from "../assets/JAMES-COOK-UNIVERSITY.jpg";
import Img18 from "../assets/KEELE-UNIVERSITY.png";
import Img19 from "../assets/MONASH-UNIVERSITY.jpg";
import Img20 from "../assets/MUSITECHNIC.jpg";
import Img21 from "../assets/NAVITAS.jpg";
import Img22 from "../assets/NOTTHIGHAM-TRENT-UNIVERSITY.png";
import Img23 from "../assets/RAFFELS-DESIGN-INSTITUTE.jpg";
import Img24 from "../assets/SIM-GLOBAL.jpg";
import Img25 from "../assets/THE-UNIVERSITY-OF-WESTERN-AUSTRALIA.jpg";
import Img26 from "../assets/TORRENTS-UNIVERSITY.jpg";
import Img27 from "../assets/UAL.png";
import Img28 from "../assets/UNIVERSITY-OF-BIRMINGHAM.jpg";
import Img29 from "../assets/UNIVERSITY-OF-BIRMINGHAM.png";
import Img30 from "../assets/UNIVERSITY-OF-CANADA-WEST.jpg";
import Img31 from "../assets/UNIVERSITY-OF-DERBY.png";
import Img32 from "../assets/UNIVERSITY-OF-DUNDEE.png";
import Img33 from "../assets/UNIVERSITY-OF-EAST-ANGILIA.png";
import Img34 from "../assets/UNIVERSITY-OF-EXETER.png";
import Img35 from "../assets/UNIVERSITY-OF-LIVERPOOL.png";
import Img36 from "../assets/UNIVERSITY-OF-MANCHESTER.png";
import Img37 from "../assets/UNIVERSITY-OF-SHEFFIELD.png";
import Img38 from "../assets/UNIVERSITY-OF-SOUTH-AUSTRALIA.jpg";
import Img39 from "../assets/UNIVERSITY-OF-SOUTHERN-QUEENSLAND.jpg";
import Img40 from "../assets/UNIVERSITY-OF-SOUTH-WALES.jpg";
import Img41 from "../assets/UNIVERSITY-OF-STRATHCLYDE-LOGO.png";
import Img42 from "../assets/UNIVERSITY-OF-SUSSEX.png";
import Img43 from "../assets/UNIVERSITY-OF-SYDNEY.jpg";
import "./style.css";

function References() {
const history = useHistory();
const { currentUser } = useContext(AuthContext);
if (!currentUser) {
		return <Redirect to="/login" />;
	}
	return (
		<div className="referenceBody">


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



			<br />
			<br /><br />
			<br /><br />
			<br />
<div style={{textAlign: 'center'}}>
 <Button variant="contained" color="primary" onClick={() => history.goBack()} style={{ float : 'right'}}>
        Back
      </Button>
</div>
	<br /><br /><br /><br />	
	<img src={Img2} alt="Sample photo" />
			<img src={Img1} alt="Sample photo" />
			<img src={Img3} alt="Sample photo" />
			<img src={Img4} alt="Sample photo" />
			<img src={Img5} alt="Sample photo" />
			<img src={Img6} alt="Sample photo" />
			<img src={Img7} alt="Sample photo" />
			<img src={Img8} alt="Sample photo" />
			<img src={Img9} alt="Sample photo" />
			<img src={Img10} alt="Sample photo" />
			<img src={Img11} alt="Sample photo" />

			<img src={Img12} alt="Sample photo" />
			<img src={Img13} alt="Sample photo" />
			<img src={Img14} alt="Sample photo" />
			<img src={Img15} alt="Sample photo" />
			<img src={Img16} alt="Sample photo" />
			<img src={Img17} alt="Sample photo" />

			<img src={Img18} alt="Sample photo" />
			<img src={Img19} alt="Sample photo" />
			<img src={Img20} alt="Sample photo" />
			<img src={Img21} alt="Sample photo" />
			<img src={Img22} alt="Sample photo" />
			<img src={Img23} alt="Sample photo" />
			<img src={Img24} alt="Sample photo" />
			<img src={Img25} alt="Sample photo" />
			<img src={Img26} alt="Sample photo" />

			<img src={Img27} alt="Sample photo" />
			<img src={Img28} alt="Sample photo" />
			<img src={Img29} alt="Sample photo" />
			<img src={Img30} alt="Sample photo" />
			<img src={Img31} alt="Sample photo" />
			<img src={Img32} alt="Sample photo" />
			<img src={Img33} alt="Sample photo" />
			<img src={Img34} alt="Sample photo" />

			<img src={Img35} alt="Sample photo" />
			<img src={Img36} alt="Sample photo" />
			<img src={Img37} alt="Sample photo" />
			<img src={Img38} alt="Sample photo" />
			<img src={Img39} alt="Sample photo" />
			<img src={Img40} alt="Sample photo" />
			<img src={Img41} alt="Sample photo" />
			<img src={Img42} alt="Sample photo" />

			<img src={Img43} alt="Sample photo" />
			<br />
			<br />
		</div>
	);
}

export default References;
