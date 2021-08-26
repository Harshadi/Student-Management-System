import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import "./style.css";
import Logo from "../assets/logo.png";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Select from "react-select";
import data from "./data.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const AddStudentApplicationUniversity = (props) => {
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
	var incomplete = 0;
	var complete = 0;
	var inProgress = 0;
	var univ = "";
	const [university, setUniversity] = useState(null);
	const [univcountry, setUnivcountry] = useState(null);
	const [univlist, setUnivlist] = useState([]);

	console.log(props.location.state.detail);
	const [ddl1, setDdl1] = useState([]);
	const [ddl2, setDdl2] = useState([]);
	const [selectddl, setSelectddl] = useState("");
	useEffect(() => {
		setDdl1([
			{
				country: "UK Universities",
				ddl2: [
					"Aston University",
					"Amity Global Instiute",
					"Arts University Bournemouth",
					"Bangor University",
					"Bath Spa University",
					"Birbeck University of London",
					"Birmingham City International College Ltd an Associate College of Birmingham City University (Navitas)",
					"Birmingham City University",
					"Bournemouth University International College (Kaplan International)",
					"Brunel University",
					"Cambridge Education Group",
					"Cambridge Ruskin International College Limited an Associate College of Anglia Ruskin University CN (Navitas)",
					"Canterbury Christ Church University",
					"Cardiff Metroplitan University",
					"Cardiff University",
					"City University London",
					"City, University of London (INTO University)",
					"Coventry University",
					"Cranfield University",
					"De Montfort University",
					"Durham University",
					"Glasgow Caledonian University",
					"Glasgow Caledonian University (INTO University)",
					"Glasgow International College (Kaplan International)",
					"Hertfordshire International College an Associate College of the University of Hertfordshire (Navitas)",
					"Heriot Watt University",
					"International College at Robert Gordon University Ltd an Affiliate College of Robert Gordon University (Navitas)",
					"International College Portsmouth Ltd an Associate College of the University of Portsmouth (Navitas)",
					"Istituto Marangoni, London",
					"Kaplan International",
					"Kaplan International College London (Kaplan International)",
					"Keele University",
					"Kingston University",
					"Le - Cordon Bleu, London",
					"Leicester Global Study Centre, University of Leicester (Navitas)",
					"Liverpool Hope University (Referral Agreement)",
					"Liverpool International College (Kaplan International)",
					"Liverpool John Moore’s University",
					"London IBT Ltd trading as London Brunel International College an Affiliate College of Brunel University (Navitas)",
					"London South Bank University",
					"Loughborough University",
					"Manchester Metroploitan University",
					"Middlesex University",
					"Newcastle University (INTO University)",
					"Newcastle University London",
					"Northampton IC Ltd trading as University of Northampton International College an Associate College of the University of Northampton (Navitas)",
					"Nottingham Foundation Academy”, “The University of Nottingham” and “The University of Nottingham International College (Kaplan International)",
					"Nottingham Trent International College (Kaplan International)",
					"Nottingham Trent University",
					"Oxford Interational Education Group",
					"Plymouth Devon International College Ltd trading as The University of Plymouth International College an Associate College of the University of Plymouth (Navitas)",
					"Plymouth University",
					"QS Quacquarelli Symonds Limited",
					"Queen Mary University of London",
					"Queen’s University Belfast (INTO University)",
					"Queens University Belfast",
					"Regents University London",
					"Royal Holloway University",
					"Royal Holloway University",
					"Sheffield Hallam University",
					"SOAS",
					"SwaN Global Education LLP trading as The College, Swansea University (Navitas)",
					"Swansea University",
					"Teeside University",
					"Ulster University",
					"Univeristy of Liverpool",
					"University of Aberdeen",
					"University of Arts London",
					"University of Bedfordshire",
					"University of Birmingham",
					"University of Bradford",
					"University of Brighton",
					"University of Brighton’s International College (Kaplan International)",
					"University of Bristol",
					"University of Central Lancashire",
					"University of Chester",
					"University of Derby",
					"University of Dundee",
					"University of East Anglia (INTO University)",
					"University of Essex International College (Kaplan International)",
					"University of Exeter",
					"Universtiy of East Anglia",
					"University of Greenwich",
					"University of Hertfordshire",
					"University of Kent",
					"University of Law",
					"University of Manchester",
					"University of Nottingham",
					"University of Reading",
					"University of Roehampton",
					"University of Sheffield",
					"University of South Wales",
					"University of Stirling",
					"University of Stirling (INTO University)",
					"University of Strathclyde",
					"University of Surrey",
					"University of Sussex",
					"University of the West of England, Bristol's International College (Kaplan International)",
					"University of West Scotland",
					"University of York",
					"University of York International Pathway College (Kaplan International)",
				],
			},

			{
				country: "Australia Universities",
				ddl2: [
					"ANU College (Study Group)",
					"ATMC",
					"Australia Catholic University",
					"Bond University",
					"Charles Sturt University (Study Group)",
					"Charles Darwin University",
					"Charles Sturt University",
					"CQ University",
					"Curtin College in association with Curtin University of Technology (Navitas)",
					"Deakin College in association with Deakin University",
					"Deakin University",
					"Edith Cowan College Pty Ltd in association with Edith Cowan University (Navitas)",
					"Edith Cowan University",
					"Educational Enterprises Australia Pty Ltd operating as Eynesbury College, Eynesbury College Academy of English (ECAE), Eynesbury Institute of Business and Technology, Eynesbury, and Eynesbury Internationa (Navitas)",
					"Flinders International Study Centre (Study Group)",
					"Flinders University",
					"Griffith College in association with Griffith University (Navitas)",
					"Griffith University",
					"James Cook University - Brisbane & Sarrino Russo",
					"James Cook University - Townsville",
					"Kaplan Business School",
					"Kaplan International",
					"La Trobe University",
					"La Trobe University Sydney Campus in association with La Trobe University (Navitas)",
					"Le Cordon Bleu",
					"Lyons College",
					"Macquarie University",
					"Monash University",
					"Murdoch University",
					"Navitas Bundoora Pty Ltd trading as La Trobe College Australia in association with La Trobe University (Navitas)",
					"Navitas Professional Institute Pty Ltd trading as Australian College of Applied Psychology (Navitas)",
					"NIC in association with the University of Newcastle (Navitas)",
					"RMIT",
					"South Australian Institute of Business and Technology Pty Ltd and Centre for English Language in the University of South Australia in association with University of South Australia (Navitas)",
					"Southern Cross University",
					"Southern Cross University (Educo International Group)",
					"Southern Cross University- The Hotel School",
					"Swinburne University of Technology",
					"Sydney Institute of Business and Technology Pty Ltd (Navitas )",
					"Taylors College (Study Group)",
					"The University of Southern Queensland",
					"Blue Mountains International Hotel Management School- Torrens University.",
					"University of Adelaide",
					"University of Melboune",
					"University of Newcastle",
					"University of New South Wales (UNSW)",
					"University of Queensland",
					"University of South Australia",
					"University of Sydney",
					"University of Sydney - Foundation Program (Study Group)",
					"University of Tasmania",
					"University of Western Australia",
					"University of Wollongong",
					"Western Sydney University",
					"Western Sydney University International College Pty Ltd in association with Western Sydney University (Navitas)",
				],
			},
			{
				country: "New Zealand Universities",
				ddl2: [
					"AIS",
					"ARA Institute of Canterbury",
					"Aspire 2",
					"ATMC",
					"AUT University",
					"Christchurch Institute of Business and Technology trading as UC International College in association with the University of Canterbury (Navitas)",
					"EIT",
					"ICL Education Group",
					"Le Cordon Bleu",
					"Massey University",
					"Newton College of Business and Technology",
					"NMIT",
					"Northec",
					"NZAAL",
					"NZIBT",
					"NZIE",
					"NZSE",
					"Otago Polytechnic",
					"PIHMS",
					"Southern Institute of Technology",
					"The University of Auckland",
					"The University of Otago",
					"TOI-Ohomai",
					"UCOL",
					"Unitec",
					"University of Waikato Taylors College (Study Group)",
					"University of Canterbury",
					"University of Lincoln",
					"University of Waikato",
					"UP Education",
					"Victoria University of Wellington",
					"Western Instiute of Technology at Taranaki - WITT",
					"Whitecliffe",
					"Whiteria & Weltec",
					"Wintec",
				],
			},
			{
				country: "Singapore Universities",
				ddl2: [
					"Amity Global Instiute",
					"At Sunrice",
					"Curtin Singapore managed and operated by Curtin Education Centre Pte Ltd (Navitas)",
					"James Cook University",
					"Lasalle College of the Arts",
					"MDIS",
					"Navitas English Singapore managed and operated by Curtin Education Centre Pte Ltd (Navitas)",
					"Ngee Ann Academy Pte Ltd",
					"PSB Academy",
					"Raffles Education Network",
					"SDH Institute",
					"Singapore Instiute of Management",
				],
			},
			{
				country: "Ireland Universities",
				ddl2: [
					"Dublin City University (Educo International Group)",
					"Institute of Technology Sligo (Educo International Group)",
					"Athlone Instiute of Technology",
					"Dublin International Study Centre (Study Group)",
					"Dublin Business School",
					"Dublin City University",
					"Dublin Institute of Technology (Educo International Group)",
					"Dundalk Institute of Technology",
					"Griffith College",
					"IT Carlow",
					"Limerick Instiute of Technology",
					"Maynooth University",
					"Maynooth University (Educo International Group)",
					"National College of Ireland",
					"Trinity College Dublin & Trinity Business School",
					"University College Cork",
					"University College Dublin",
					"Waterford Institute of Technology",
				],
			},
			{
				country: "Dubai Universities",
				ddl2: [
					"Abu Dhabi University",
					"Amity Education Group",
					"Curtin University",
					"Manipal Academy of Higher Education",
					"Murdoch University (Navitas)",
					"University of Birmingham",
					"Heriot Watt University",
					"HTMI",
				],
			},
			{
				country: "Germany Universities",
				ddl2: [
					"Berlin School of Business and Innovation",
					"Colonge Business School",
					"EU Business School",
					"IUBH University of Applied Science",
					"Lancaster University, Leipzig (Navitas)",
					"University of Europe of Applied Science",
					"Steinbeis School of Management and Innovation",
					"New European College",
				],
			},
			{
				country: "USA Universities",
				ddl2: [
					"Adelphi University (Shorelight)",
					"American University (Shorelight)",
					"Arizona State University (Kaplan International)",
					"Auburn University (Shorelight)",
					"Auburn University, Montgomery (Shorelight)",
					"Clevland State University (Shorelight)",
					"Duquesne University School",
					"Florida International University (Shorelight)",
					"Hult International Business School- All Campuses",
					"Louisiana State University (Shorelight)",
					"McKim Business School (Kaplan International)",
					"Navitas Boca Raton LLC as operator of the FAU Global Student Success Program pathway to Florida Atlantic University 'FAU' (Navitas)",
					"Navitas Boston LLC as operator of the International Student Success Program at UMass Boston pathway to University of Massachusetts Boston 'UMass Boston' (Navitas)",
					"Navitas Lowell LLC as operator of Global Student Success Program at UMass Lowell pathway to University of Massachusetts Lowell 'UMass Lowell' (Navitas)",
					"Navitas New York LLC as operator of the Queens College Global Student Success Program pathway to Queens College, City of New York (Navitas)",
					"New Jersey Institute of Technology (Educo International Group)",
					"Northeastern University (Kaplan International)",
					"Pace University (Kaplan International)",
					"Richard Bland College lof William and Mary (Navitas)",
					"SAE Institute of Technology, Chicago (Navitas)",
					"Seattle Pacific University (Educo International Group)",
					"Study Group USA Higher Education",
					"The University of Tulsa (Kaplan International)",
					"Uniersity of Dayton (Shorelight)",
					"University of Central Florida (Shorelight)",
					"University of Illinois at Chicago (Shorelight)",
					"University of Kansas (Shorelight)",
					"University of Maryland, Baltimore Count (Educo International Group)",
					"University of Nebraska–Lincoln (Educo International Group)",
					"University of North Texas (Educo International Group)",
					"University of South Alabama (University Marketing Systems)",
					"Academy of Art University",
				],
			},
			{
				country: "Canada Universities",
				ddl2: [
					"Acsenda School of Management (Educo International Group)",
					"Arbutus College (Educo International Group)",
					"Bay River College",
					"Formation Musictechnic",
					"Fraser International College in association with Simon Fraser University (Navitas)",
					"International College of Manitoba pathway to the University of Manitoba (Navitas)",
					"Ryerson University Intl College (Navitas)",
					"SAE Institute Inc (Vancouver) (Navitas)",
					"Seneca College of Arts and Technology",
					"Study Group Canada Higher Education",
					"University Canada West (Global University Systems )",
					"College Avalon",
					"NORTHWESTEXECUTIVE EDUCATION - Northwood University",
					"Toronto School of Management - Global University Systems *Condition* 2 months time to perform ",
					"Cape Breton University (MSM Unify) - *Condition* 2 students to enroll",
					"LCI Education Network -*Condtion* 2 application and 1 student enrolled on campus",
					"Selkirk College -(MSQUARE MEDIA) *Condition* 2 students to enroll",
					"Herzing College",
				],
			},
			{
				country: "Switzerland Universities",
				ddl2: [
					"EU Business School",
					"Glion Institute of Higher Education - Sommet Education",
					"HTMI",
				],
			},
			{
				country: "Italy Universities",
				ddl2: ["Domus Academy & NA", "Istituto of Marangoni"],
			},
			{
				country: "France Universities",
				ddl2: ["IDRAC", "QS Quacquarelli Symonds Limited"],
			},
			{ country: "Paris Universities", ddl2: ["Istituto of Marangoni"] },
			{
				country: "Netherlands Universities",
				ddl2: [
					"Holland International Study Centre (Study Group)",
					"The Hague Pathway College (Navitas)",
				],
			},
			{
				country: "West Indies Universities",
				ddl2: ["St. Gerorge's University"],
			},
			{
				country: "Cyprus Universities",
				ddl2: ["University of Nicosia (Cammino Global Education)"],
			},
			{
				country: "India Universities",
				ddl2: ["Istituto Marangoni Mumbai Training Centre Private Limited"],
			},
		]);
	}, []);

	function selectChange(e) {
		setSelectddl(e.target.value);
		console.log(selectddl);
		ddl1.find((x) => {
			if (x.country === e.target.value) {
				setDdl2(x.ddl2);
			}
		});
		console.log(ddl2);
		// setDdl2(ddl1.find(x => country === e.target.value).ddl2)
	}

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

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<select value={selectddl} onChange={selectChange}>
				<option>Select the university</option>
				{ddl1 ? ddl1.map((x) => <option>{x.country}</option>) : null}
			</select>

			<select>
				<option selected disabled>
					{" "}
					select univ
				</option>
				{ddl2 ? ddl2.map((x) => <option>{x}</option>) : null}
			</select>

			{/* <h3>UK Universities</h3>
			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Aston University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Aston University",
									state: {
										detail: props.location.state.detail,
										univ: "Aston University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Amity Global Instiute</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Amity Global Instiute",
									state: {
										detail: props.location.state.detail,
										univ: "Amity Global Instiute",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Arts University Bournemouth</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Arts University Bournemouth",
									state: {
										detail: props.location.state.detail,
										univ: "Arts University Bournemouth",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Bangor University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Bangor University",
									state: {
										detail: props.location.state.detail,
										univ: "Bangor University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Bath Spa University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Bath Spa University",
									state: {
										detail: props.location.state.detail,
										univ: "Bath Spa University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Birbeck University of London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Birbeck University of London",
									state: {
										detail: props.location.state.detail,
										univ: "Birbeck University of London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Birmingham City International College Ltd an Associate College of
						Birmingham City University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Birmingham City International College Ltd an Associate College of Birmingham City University (Navitas) ",
									state: {
										detail: props.location.state.detail,
										univ: "Birmingham City International College Ltd an Associate College of Birmingham City University (Navitas) ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Birmingham City University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Birbeck University of London",
									state: {
										detail: props.location.state.detail,
										univ: "Birbeck University of London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Bournemouth University International College (Kaplan International)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Bournemouth University International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Bournemouth University International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Brunel University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Brunel University",
									state: {
										detail: props.location.state.detail,
										univ: "Brunel University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Cambridge Education Group</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Cambridge Education Group",
									state: {
										detail: props.location.state.detail,
										univ: "Cambridge Education Group",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Cambridge Ruskin International College Limited an Associate College
						of Anglia Ruskin University CN (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Cambridge Ruskin International College Limited an Associate College of Anglia Ruskin University CN  (Navitas) ",
									state: {
										detail: props.location.state.detail,
										univ: "Cambridge Ruskin International College Limited an Associate College of Anglia Ruskin University CN  (Navitas) ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Canterbury Christ Church University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Canterbury Christ Church University",
									state: {
										detail: props.location.state.detail,
										univ: "Canterbury Christ Church University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Cardiff Metroplitan University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Cardiff Metroplitan University",
									state: {
										detail: props.location.state.detail,
										univ: "Cardiff Metroplitan University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Cardiff University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Cardiff University",
									state: {
										detail: props.location.state.detail,
										univ: "Cardiff University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>City University London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "City University London",
									state: {
										detail: props.location.state.detail,
										univ: "City University London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>City, University of London (INTO University)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "City, University of London (INTO University)",
									state: {
										detail: props.location.state.detail,
										univ: "City, University of London (INTO University)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Coventry University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Coventry University",
									state: {
										detail: props.location.state.detail,
										univ: "Coventry University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Cranfield University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Cranfield University",
									state: {
										detail: props.location.state.detail,
										univ: "Cranfield University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>De Montfort University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "De Montfort University",
									state: {
										detail: props.location.state.detail,
										univ: "De Montfort University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Durham University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Durham University",
									state: {
										detail: props.location.state.detail,
										univ: "Durham University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Glasgow Caledonian University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Glasgow Caledonian University",
									state: {
										detail: props.location.state.detail,
										univ: "Glasgow Caledonian University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Glasgow Caledonian University (INTO University)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Glasgow Caledonian University (INTO University)",
									state: {
										detail: props.location.state.detail,
										univ: "Glasgow Caledonian University (INTO University)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Glasgow International College (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Glasgow International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Glasgow International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Hertfordshire International College an Associate College of the
						University of Hertfordshire (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Hertfordshire International College an Associate College of the University of Hertfordshire  (Navitas) ",
									state: {
										detail: props.location.state.detail,
										univ: "Hertfordshire International College an Associate College of the University of Hertfordshire  (Navitas) ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Heriot Watt University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Heriot Watt University ",
									state: {
										detail: props.location.state.detail,
										univ: "Heriot Watt University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						International College at Robert Gordon University Ltd an Affiliate
						College of Robert Gordon University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "International College at Robert Gordon University Ltd an Affiliate College of Robert Gordon University  (Navitas)  ",
									state: {
										detail: props.location.state.detail,
										univ: "International College at Robert Gordon University Ltd an Affiliate College of Robert Gordon University  (Navitas) ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						International College Portsmouth Ltd an Associate College of the
						University of Portsmouth (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "International College Portsmouth Ltd an Associate College of the University of Portsmouth  (Navitas) ",
									state: {
										detail: props.location.state.detail,
										univ: "International College Portsmouth Ltd an Associate College of the University of Portsmouth  (Navitas) ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Istituto Marangoni, London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Istituto Marangoni, London",
									state: {
										detail: props.location.state.detail,
										univ: "Istituto Marangoni, London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Kaplan International</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Kaplan International",
									state: {
										detail: props.location.state.detail,
										univ: "Kaplan International",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Kaplan International College London (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Kaplan International College London (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Kaplan International College London (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Keele University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Keele University",
									state: {
										detail: props.location.state.detail,
										univ: "Keele University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Kingston University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Kingston University",
									state: {
										detail: props.location.state.detail,
										univ: "Kingston University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Le - Cordon Bleu, London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Le - Cordon Bleu, London",
									state: {
										detail: props.location.state.detail,
										univ: "Le - Cordon Bleu, London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Leicester Global Study Centre, University of Leicester (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Leicester Global Study Centre, University of Leicester (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Leicester Global Study Centre, University of Leicester (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Liverpool Hope University (Referral Agreement)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Liverpool Hope University (Referral Agreement)",
									state: {
										detail: props.location.state.detail,
										univ: "Liverpool Hope University (Referral Agreement)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Liverpool International College (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Liverpool International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Liverpool International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Liverpool John Moore’s University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Liverpool John Moore’s University",
									state: {
										detail: props.location.state.detail,
										univ: "Liverpool John Moore’s University ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						London IBT Ltd trading as London Brunel International College an
						Affiliate College of Brunel University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "London IBT Ltd trading as London Brunel International College an Affiliate College of Brunel University  (Navitas) ",
									state: {
										detail: props.location.state.detail,
										univ: "London IBT Ltd trading as London Brunel International College an Affiliate College of Brunel University  (Navitas) ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>London South Bank University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "London South Bank University",
									state: {
										detail: props.location.state.detail,
										univ: "London South Bank University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Loughborough University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Loughborough University",
									state: {
										detail: props.location.state.detail,
										univ: "Loughborough University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Manchester Metroploitan University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Manchester Metroploitan University",
									state: {
										detail: props.location.state.detail,
										univ: "Manchester Metroploitan University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Middlesex University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Middlesex University",
									state: {
										detail: props.location.state.detail,
										univ: "Middlesex University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Newcastle University (INTO University)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Newcastle University (INTO University)",
									state: {
										detail: props.location.state.detail,
										univ: "Newcastle University (INTO University)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Newcastle University London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Newcastle University London",
									state: {
										detail: props.location.state.detail,
										univ: "Newcastle University London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Northampton IC Ltd trading as University of Northampton
						International College an Associate College of the University of
						Northampton (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Northampton IC Ltd trading as University of Northampton International College an Associate College of the University of Northampton  (Navitas) ",
									state: {
										detail: props.location.state.detail,
										univ: "Northampton IC Ltd trading as University of Northampton International College an Associate College of the University of Northampton  (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Nottingham Foundation Academy”, “The University of Nottingham” and
						“The University of Nottingham International College (Kaplan
						International)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Nottingham Foundation Academy”, “The University of Nottingham” and “The University of Nottingham International College (Kaplan International",
									state: {
										detail: props.location.state.detail,
										univ: "Northampton IC Ltd trading as University of Northampton International College an Associate College of the University of Northampton",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Nottingham Trent International College (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Nottingham Trent International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Nottingham Trent International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Nottingham Trent University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Nottingham Trent University",
									state: {
										detail: props.location.state.detail,
										univ: "Nottingham Trent University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Oxford Interational Education Group</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Oxford Interational Education Group",
									state: {
										detail: props.location.state.detail,
										univ: "Oxford Interational Education Group",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Plymouth Devon International College Ltd trading as The University
						of Plymouth International College an Associate College of the
						University of Plymouth (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Plymouth Devon International College Ltd trading as The University of Plymouth International College an Associate College of the University of Plymouth  (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Plymouth Devon International College Ltd trading as The University of Plymouth International College an Associate College of the University of Plymouth  (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Plymouth University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Plymouth University",
									state: {
										detail: props.location.state.detail,
										univ: "Plymouth University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>QS Quacquarelli Symonds Limited</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "QS Quacquarelli Symonds Limited ",
									state: {
										detail: props.location.state.detail,
										univ: "QS Quacquarelli Symonds Limited",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Queen Mary University of London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Queen Mary University of London",
									state: {
										detail: props.location.state.detail,
										univ: "Queen Mary University of London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Queen’s University Belfast (INTO University)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Queen’s University Belfast (INTO University)",
									state: {
										detail: props.location.state.detail,
										univ: "Queen’s University Belfast (INTO University)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Queens University Belfast</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Queens University Belfast",
									state: {
										detail: props.location.state.detail,
										univ: "Queens University Belfast",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Regents University London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Regents University London",
									state: {
										detail: props.location.state.detail,
										univ: "Regents University London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Royal Holloway University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Royal Holloway University",
									state: {
										detail: props.location.state.detail,
										univ: "Royal Holloway University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Royal Holloway University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Royal Holloway University",
									state: {
										detail: props.location.state.detail,
										univ: "Royal Holloway University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Sheffield Hallam University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Sheffield Hallam University",
									state: {
										detail: props.location.state.detail,
										univ: "Sheffield Hallam University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>SOAS</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "SOAS",
									state: { detail: props.location.state.detail, univ: "SOAS" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						SwaN Global Education LLP trading as The College, Swansea University
						(Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "SwaN Global Education LLP trading as The College, Swansea University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "SwaN Global Education LLP trading as The College, Swansea University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Swansea University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Swansea University",
									state: {
										detail: props.location.state.detail,
										univ: "Swansea University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Teeside University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Teeside University",
									state: {
										detail: props.location.state.detail,
										univ: "Teeside University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Ulster University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Ulster University",
									state: {
										detail: props.location.state.detail,
										univ: "Ulster University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Univeristy of Liverpool</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Univeristy of Liverpool",
									state: {
										detail: props.location.state.detail,
										univ: "Univeristy of Liverpool",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Aberdeen</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Aberdeen",
									state: {
										detail: props.location.state.detail,
										univ: "University of Aberdeen",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Arts London</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Arts London",
									state: {
										detail: props.location.state.detail,
										univ: "University of Arts London",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Bedfordshire</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Bedfordshire",
									state: {
										detail: props.location.state.detail,
										univ: "University of Bedfordshire",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Birmingham</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Birmingham",
									state: {
										detail: props.location.state.detail,
										univ: "University of Birmingham",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Bradford</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Bradford",
									state: {
										detail: props.location.state.detail,
										univ: "University of Bradford",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Brighton</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Brighton",
									state: {
										detail: props.location.state.detail,
										univ: "University of Brighton",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						University of Brighton’s International College (Kaplan
						International)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Brighton’s International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Brighton’s International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Bristol</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Bristol",
									state: {
										detail: props.location.state.detail,
										univ: "University of Bristol",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Central Lancashire</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Central Lancashire",
									state: {
										detail: props.location.state.detail,
										univ: "University of Central Lancashire",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Chester</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Chester",
									state: {
										detail: props.location.state.detail,
										univ: "University of Chester",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Derby</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Derby",
									state: {
										detail: props.location.state.detail,
										univ: "University of Derby",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Dundee</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Dundee",
									state: {
										detail: props.location.state.detail,
										univ: "University of Dundee",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of East Anglia (INTO University)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of East Anglia (INTO University)",
									state: {
										detail: props.location.state.detail,
										univ: "University of East Anglia (INTO University)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						University of Essex International College (Kaplan International)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Essex International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Essex International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Exeter</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Exeter",
									state: {
										detail: props.location.state.detail,
										univ: "University of Exeter",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Universtiy of East Anglia</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Universtiy of East Anglia",
									state: {
										detail: props.location.state.detail,
										univ: "Universtiy of East Anglia",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Greenwich</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Greenwich",
									state: {
										detail: props.location.state.detail,
										univ: "University of Greenwich",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Hertfordshire</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Hertfordshire",
									state: {
										detail: props.location.state.detail,
										univ: "University of Hertfordshire",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Kent</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Kent",
									state: {
										detail: props.location.state.detail,
										univ: "University of Kent",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Law</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Law",
									state: {
										detail: props.location.state.detail,
										univ: "University of Law",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Manchester</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Manchester",
									state: {
										detail: props.location.state.detail,
										univ: "University of Manchester",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Nottingham</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Nottingham",
									state: {
										detail: props.location.state.detail,
										univ: "University of Nottingham",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Reading</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Reading",
									state: {
										detail: props.location.state.detail,
										univ: "University of Reading",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Roehampton</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Roehampton",
									state: {
										detail: props.location.state.detail,
										univ: "University of Roehampton",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Sheffield</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Sheffield",
									state: {
										detail: props.location.state.detail,
										univ: "University of Sheffield",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of South Wales</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of South Wales",
									state: {
										detail: props.location.state.detail,
										univ: "University of South Wales",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Stirling</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Stirling",
									state: {
										detail: props.location.state.detail,
										univ: "University of Stirling",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Stirling (INTO University)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Stirling (INTO University)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Stirling (INTO University)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Strathclyde</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Strathclyde",
									state: {
										detail: props.location.state.detail,
										univ: "University of Strathclyde",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Surrey</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Surrey",
									state: {
										detail: props.location.state.detail,
										univ: "University of Surrey",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Sussex</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Sussex",
									state: {
										detail: props.location.state.detail,
										univ: "University of Sussex",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						University of the West of England, Bristol's International College
						(Kaplan International)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of the West of England, Bristol's International College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "University of the West of England, Bristol's International College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of West Scotland</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of West Scotland",
									state: {
										detail: props.location.state.detail,
										univ: "University of West Scotland",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of York</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of York",
									state: {
										detail: props.location.state.detail,
										univ: "University of York",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						University of York International Pathway College (Kaplan
						International)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of York International Pathway College (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "University of York International Pathway College (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Australia Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>ANU College (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "ANU College (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "ANU College (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>ATMC</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "ATMC",
									state: { detail: props.location.state.detail, univ: "ATMC" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Australia Catholic University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Australia Catholic University",
									state: {
										detail: props.location.state.detail,
										univ: "Australia Catholic University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Bond University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Bond University",
									state: {
										detail: props.location.state.detail,
										univ: "Bond University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Charles Sturt University (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Charles  Sturt  University (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Charles  Sturt  University (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Charles Darwin University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Charles Darwin University",
									state: {
										detail: props.location.state.detail,
										univ: "Charles Darwin University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Charles Sturt University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Charles Sturt University",
									state: {
										detail: props.location.state.detail,
										univ: "Charles Sturt University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>CQ University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "CQ University",
									state: {
										detail: props.location.state.detail,
										univ: "CQ University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Curtin College in association with Curtin University of Technology
						(Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Curtin College in association with Curtin University of Technology (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Curtin College in association with Curtin University of Technology (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Deakin College in association with Deakin University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Deakin College in association with Deakin University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Deakin College in association with Deakin University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Deakin University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Deakin University",
									state: {
										detail: props.location.state.detail,
										univ: "Deakin University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Edith Cowan College Pty Ltd in association with Edith Cowan
						University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Edith Cowan College Pty Ltd in association with Edith Cowan University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Edith Cowan College Pty Ltd in association with Edith Cowan University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Edith Cowan University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Edith Cowan University",
									state: {
										detail: props.location.state.detail,
										univ: "Edith Cowan University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Educational Enterprises Australia Pty Ltd operating as Eynesbury
						College, Eynesbury College Academy of English (ECAE), Eynesbury
						Institute of Business and Technology, Eynesbury, and Eynesbury
						Internationa (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Educational Enterprises Australia Pty Ltd operating as Eynesbury College, Eynesbury College Academy of English (ECAE), Eynesbury Institute of Business and Technology, Eynesbury, and Eynesbury Internationa (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Educational Enterprises Australia Pty Ltd operating as Eynesbury College, Eynesbury College Academy of English (ECAE), Eynesbury Institute of Business and Technology, Eynesbury, and Eynesbury Internationa (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Flinders International Study Centre (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Flinders  International  Study Centre (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Flinders  International  Study Centre (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Flinders University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Flinders University",
									state: {
										detail: props.location.state.detail,
										univ: "Flinders University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Griffith College in association with Griffith University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Griffith College in association with Griffith University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Griffith College in association with Griffith University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Griffith University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Griffith University",
									state: {
										detail: props.location.state.detail,
										univ: "Griffith University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>James Cook University - Brisbane & Sarrino Russo</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "James Cook University - Brisbane & Sarrino Russo",
									state: {
										detail: props.location.state.detail,
										univ: "James Cook University - Brisbane & Sarrino Russo",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>James Cook University - Townsville</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "James Cook University - Townsville",
									state: {
										detail: props.location.state.detail,
										univ: "James Cook University - Townsville",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Kaplan Business School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Kaplan Business School",
									state: {
										detail: props.location.state.detail,
										univ: "Kaplan Business School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Kaplan International</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Kaplan International",
									state: {
										detail: props.location.state.detail,
										univ: "Kaplan International",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>La Trobe University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "La Trobe University",
									state: {
										detail: props.location.state.detail,
										univ: "La Trobe University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						La Trobe University Sydney Campus in association with La Trobe
						University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "La Trobe University Sydney Campus in association with La Trobe University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "La Trobe University Sydney Campus in association with La Trobe University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Le Cordon Bleu</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Le Cordon Bleu",
									state: {
										detail: props.location.state.detail,
										univ: "Le Cordon Bleu",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Lyons College</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Lyons College",
									state: {
										detail: props.location.state.detail,
										univ: "Lyons College",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Macquarie University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Macquarie University",
									state: {
										detail: props.location.state.detail,
										univ: "Macquarie University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Monash University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Monash University",
									state: {
										detail: props.location.state.detail,
										univ: "Monash University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Murdoch University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Murdoch University",
									state: {
										detail: props.location.state.detail,
										univ: "Murdoch University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas Bundoora Pty Ltd trading as La Trobe College Australia in
						association with La Trobe University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas Bundoora Pty Ltd trading as La Trobe College Australia in association with La Trobe University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas Bundoora Pty Ltd trading as La Trobe College Australia in association with La Trobe University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas Professional Institute Pty Ltd trading as Australian College
						of Applied Psychology (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas Professional Institute Pty Ltd trading as Australian College of Applied Psychology  (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas Professional Institute Pty Ltd trading as Australian College of Applied Psychology  (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NIC in association with the University of Newcastle (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NIC in association with the University of Newcastle (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "NIC in association with the University of Newcastle (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>RMIT</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "RMIT",
									state: { detail: props.location.state.detail, univ: "RMIT" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						South Australian Institute of Business and Technology Pty Ltd and
						Centre for English Language in the University of South Australia in
						association with University of South Australia (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "South Australian Institute of Business and Technology Pty Ltd and Centre for English Language in the University of South Australia in association with University of South Australia  (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "South Australian Institute of Business and Technology Pty Ltd and Centre for English Language in the University of South Australia in association with University of South Australia  (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Southern Cross University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Southern Cross University",
									state: {
										detail: props.location.state.detail,
										univ: "Southern Cross University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Southern Cross University (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Southern Cross University (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Southern Cross University (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Southern Cross University- The Hotel School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Southern Cross University- The Hotel School",
									state: {
										detail: props.location.state.detail,
										univ: "Southern Cross University- The Hotel School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Swinburne University of Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Swinburne University of Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Swinburne University of Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Sydney Institute of Business and Technology Pty Ltd (Navitas )
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Sydney Institute of Business and Technology Pty Ltd (Navitas )",
									state: {
										detail: props.location.state.detail,
										univ: "Sydney Institute of Business and Technology Pty Ltd (Navitas )",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Taylors College (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Taylors  College (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Taylors  College (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>The University of Southern Queensland</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "The University of Southern Queensland",
									state: {
										detail: props.location.state.detail,
										univ: "The University of Southern Queensland",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Blue Mountains International Hotel Management School- Torrens
						University.
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Blue Mountains International Hotel Management School- Torrens University.",
									state: {
										detail: props.location.state.detail,
										univ: "Blue Mountains International Hotel Management School- Torrens University.",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Adelaide</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Adelaide",
									state: {
										detail: props.location.state.detail,
										univ: "University of Adelaide",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Melboune</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Melboune",
									state: {
										detail: props.location.state.detail,
										univ: "University of Melboune",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Newcastle</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Newcastle",
									state: {
										detail: props.location.state.detail,
										univ: "University of Newcastle",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of New South Wales (UNSW)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of New South Wales (UNSW)",
									state: {
										detail: props.location.state.detail,
										univ: "University of New South Wales (UNSW)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Queensland</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Queensland",
									state: {
										detail: props.location.state.detail,
										univ: "University of Queensland",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of South Australia</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of South Australia",
									state: {
										detail: props.location.state.detail,
										univ: "University of South Australia",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Sydney</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Sydney",
									state: {
										detail: props.location.state.detail,
										univ: "University of Sydney",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Sydney - Foundation Program (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Sydney - Foundation Program (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Sydney - Foundation Program (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Tasmania</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Tasmania",
									state: {
										detail: props.location.state.detail,
										univ: "University of Tasmania",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Western Australia</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Western Australia",
									state: {
										detail: props.location.state.detail,
										univ: "University of Western Australia",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Wollongong</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Wollongong",
									state: {
										detail: props.location.state.detail,
										univ: "University of Wollongong",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Western Sydney University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Western Sydney University",
									state: {
										detail: props.location.state.detail,
										univ: "Western Sydney University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Western Sydney University International College Pty Ltd in
						association with Western Sydney University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Western Sydney University International College Pty Ltd in association with Western Sydney University  (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Western Sydney University International College Pty Ltd in association with Western Sydney University  (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>New Zealand Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>AIS</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "AIS",
									state: { detail: props.location.state.detail, univ: "AIS" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>ARA Institute of Canterbury</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "ARA Institute of Canterbury",
									state: {
										detail: props.location.state.detail,
										univ: "ARA Institute of Canterbury",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Aspire 2</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Aspire 2",
									state: {
										detail: props.location.state.detail,
										univ: "Aspire 2",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>ATMC</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "ATMC",
									state: { detail: props.location.state.detail, univ: "ATMC" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>AUT University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "AUT University",
									state: {
										detail: props.location.state.detail,
										univ: "AUT University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Christchurch Institute of Business and Technology trading as UC
						International College in association with the University of
						Canterbury (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Christchurch Institute of Business and Technology trading as UC International College in association with the University of Canterbury (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Christchurch Institute of Business and Technology trading as UC International College in association with the University of Canterbury (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>EIT</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "EIT",
									state: { detail: props.location.state.detail, univ: "EIT" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>ICL Education Group</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "ICL Education Group",
									state: {
										detail: props.location.state.detail,
										univ: "ICL Education Group",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Le Cordon Bleu</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Le Cordon Bleu",
									state: {
										detail: props.location.state.detail,
										univ: "Le Cordon Bleu",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Massey University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Massey University",
									state: {
										detail: props.location.state.detail,
										univ: "Massey University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Newton College of Business and Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Newton College of Business and Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Newton College of Business and Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NMIT</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NMIT",
									state: { detail: props.location.state.detail, univ: "NMIT" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Northec</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Northec",
									state: {
										detail: props.location.state.detail,
										univ: "Northec",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NZAAL</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NZAAL",
									state: { detail: props.location.state.detail, univ: "NZAAL" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NZIBT</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NZIBT",
									state: { detail: props.location.state.detail, univ: "NZIBT" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NZIE</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NZIE",
									state: { detail: props.location.state.detail, univ: "NZIE" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NZSE</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NZSE",
									state: { detail: props.location.state.detail, univ: "NZSE" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Otago Polytechnic</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Otago Polytechnic",
									state: {
										detail: props.location.state.detail,
										univ: "Otago Polytechnic",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>PIHMS</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "PIHMS",
									state: { detail: props.location.state.detail, univ: "PIHMS" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Southern Institute of Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Southern Institute of Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Southern Institute of Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>The University of Auckland</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "The University  of Auckland",
									state: {
										detail: props.location.state.detail,
										univ: "The University  of Auckland",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>The University of Otago</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "The University of Otago",
									state: {
										detail: props.location.state.detail,
										univ: "The University of Otago",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>TOI-Ohomai</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "TOI-Ohomai",
									state: {
										detail: props.location.state.detail,
										univ: "TOI-Ohomai",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>UCOL</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "UCOL",
									state: { detail: props.location.state.detail, univ: "UCOL" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Unitec</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Unitec",
									state: {
										detail: props.location.state.detail,
										univ: "Unitec",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Waikato Taylors College (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University  of  Waikato Taylors  College (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "University  of  Waikato Taylors  College (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Canterbury</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Canterbury",
									state: {
										detail: props.location.state.detail,
										univ: "University of Canterbury",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Lincoln</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Lincoln",
									state: {
										detail: props.location.state.detail,
										univ: "University of Lincoln",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Waikato</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Waikato",
									state: {
										detail: props.location.state.detail,
										univ: "University of Waikato",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>UP Education</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "UP Education",
									state: {
										detail: props.location.state.detail,
										univ: "UP Education",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Victoria University of Wellington</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Victoria University of Wellington",
									state: {
										detail: props.location.state.detail,
										univ: "Victoria University of Wellington",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Western Instiute of Technology at Taranaki - WITT</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Western Instiute of Technology at Taranaki - WITT",
									state: {
										detail: props.location.state.detail,
										univ: "Western Instiute of Technology at Taranaki - WITT",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Whitecliffe</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Whitecliffe",
									state: {
										detail: props.location.state.detail,
										univ: "Whitecliffe",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Whiteria & Weltec</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Whiteria & Weltec",
									state: {
										detail: props.location.state.detail,
										univ: "Whiteria & Weltec",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Wintec</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Wintec",
									state: {
										detail: props.location.state.detail,
										univ: "Wintec",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Singapore Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Amity Global Instiute</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Amity Global Instiute",
									state: {
										detail: props.location.state.detail,
										univ: "Amity Global Instiute",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>At Sunrice</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "At Sunrice",
									state: {
										detail: props.location.state.detail,
										univ: "At Sunrice",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Curtin Singapore managed and operated by Curtin Education Centre Pte
						Ltd (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Curtin Singapore managed and operated by Curtin Education Centre Pte Ltd (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Curtin Singapore managed and operated by Curtin Education Centre Pte Ltd (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>James Cook University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "James Cook University",
									state: {
										detail: props.location.state.detail,
										univ: "James Cook University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Lasalle College of the Arts</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Lasalle College of the Arts",
									state: {
										detail: props.location.state.detail,
										univ: "Lasalle College of the Arts",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>MDIS</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "MDIS",
									state: { detail: props.location.state.detail, univ: "MDIS" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas English Singapore managed and operated by Curtin Education
						Centre Pte Ltd (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas English Singapore managed and operated by Curtin Education Centre Pte Ltd (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas English Singapore managed and operated by Curtin Education Centre Pte Ltd (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Ngee Ann Academy Pte Ltd</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Ngee Ann Academy Pte Ltd",
									state: {
										detail: props.location.state.detail,
										univ: "Ngee Ann Academy Pte Ltd",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>PSB Academy</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "PSB Academy",
									state: {
										detail: props.location.state.detail,
										univ: "PSB Academy",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Raffles Education Network</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Raffles Education Network",
									state: {
										detail: props.location.state.detail,
										univ: "Raffles Education Network",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>SDH Institute</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "SDH Institute",
									state: {
										detail: props.location.state.detail,
										univ: "SDH Institute",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Singapore Instiute of Management</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Singapore Instiute of Management",
									state: {
										detail: props.location.state.detail,
										univ: "Singapore Instiute of Management",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Ireland Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Dublin City University (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: " Dublin City University  (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: " Dublin City University  (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Institute of Technology Sligo (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "  Institute of Technology Sligo  (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "  Institute of Technology Sligo  (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Athlone Instiute of Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Athlone Instiute of Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Athlone Instiute of Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Dublin International Study Centre (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Dublin  International  Study Centre (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Dublin  International  Study Centre (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Dublin Business School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Dublin Business School",
									state: {
										detail: props.location.state.detail,
										univ: "Dublin Business School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Dublin City University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Dublin City University",
									state: {
										detail: props.location.state.detail,
										univ: "Dublin City University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Dublin Institute of Technology (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Dublin Institute of Technology   (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Dublin Institute of Technology   (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Dundalk Institute of Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Dundalk Institute of Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Dundalk Institute of Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Griffith College</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Griffith College",
									state: {
										detail: props.location.state.detail,
										univ: "Griffith College",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>IT Carlow</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "IT Carlow",
									state: {
										detail: props.location.state.detail,
										univ: "IT Carlow",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Limerick Instiute of Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Limerick Instiute of Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Limerick Instiute of Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Maynooth University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Maynooth University",
									state: {
										detail: props.location.state.detail,
										univ: "Maynooth University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Maynooth University (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Maynooth University (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Maynooth University (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>National College of Ireland</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "National College of Ireland",
									state: {
										detail: props.location.state.detail,
										univ: "National College of Ireland",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Trinity College Dublin & Trinity Business School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Trinity College Dublin & Trinity Business School",
									state: {
										detail: props.location.state.detail,
										univ: "Trinity College Dublin & Trinity Business School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University College Cork</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University College Cork",
									state: {
										detail: props.location.state.detail,
										univ: "University College Cork",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University College Dublin</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University College Dublin",
									state: {
										detail: props.location.state.detail,
										univ: "University College Dublin",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Waterford Institute of Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University College Dublin",
									state: {
										detail: props.location.state.detail,
										univ: "University College Dublin",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Dubai Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Abu Dhabi University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: " Abu Dhabi University",
									state: {
										detail: props.location.state.detail,
										univ: " Abu Dhabi University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Amity Education Group</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Amity Education Group",
									state: {
										detail: props.location.state.detail,
										univ: "Amity Education Group",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Curtin University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Curtin University",
									state: {
										detail: props.location.state.detail,
										univ: "Curtin University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Manipal Academy of Higher Education</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Manipal Academy of Higher Education",
									state: {
										detail: props.location.state.detail,
										univ: "Manipal Academy of Higher Education",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Murdoch University (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Murdoch University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Murdoch University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Birmingham</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Birmingham",
									state: {
										detail: props.location.state.detail,
										univ: "University of Birmingham",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Heriot Watt University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Heriot Watt University",
									state: {
										detail: props.location.state.detail,
										univ: "Heriot Watt University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>HTMI</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "HTMI",
									state: { detail: props.location.state.detail, univ: "HTMI" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Germany Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Berlin School of Business and Innovation</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Berlin School of Business and Innovation",
									state: {
										detail: props.location.state.detail,
										univ: "Berlin School of Business and Innovation",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Colonge Business School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Colonge Business School",
									state: {
										detail: props.location.state.detail,
										univ: "Colonge Business School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>EU Business School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "EU Business School",
									state: {
										detail: props.location.state.detail,
										univ: "EU Business School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>IUBH University of Applied Science</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "IUBH University of Applied Science",
									state: {
										detail: props.location.state.detail,
										univ: "IUBH University of Applied Science",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Lancaster University, Leipzig (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Lancaster University, Leipzig (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Lancaster University, Leipzig (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Europe of Applied Science</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Europe of Applied Science",
									state: {
										detail: props.location.state.detail,
										univ: "University of Europe of Applied Science",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Steinbeis School of Management and Innovation</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Steinbeis School of Management and Innovation",
									state: {
										detail: props.location.state.detail,
										univ: "Steinbeis School of Management and Innovation",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>New European College</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "New European College",
									state: {
										detail: props.location.state.detail,
										univ: "New European College",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>USA Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Adelphi University (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Adelphi University (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Adelphi University (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>American University (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "American University (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "American University (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Arizona State University (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Arizona State University (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Arizona State University (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Auburn University (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Auburn University (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Auburn University (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Auburn University, Montgomery (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Auburn University, Montgomery (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Auburn University, Montgomery (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Clevland State University (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Clevland State University (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Clevland State University (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Duquesne University School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Duquesne University School",
									state: {
										detail: props.location.state.detail,
										univ: "Duquesne University School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Florida International University (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Florida International University (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Florida International University (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Hult International Business School- All Campuses</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Hult International Business School- All Campuses",
									state: {
										detail: props.location.state.detail,
										univ: "Hult International Business School- All Campuses",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Louisiana State University (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Louisiana State University (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Louisiana State University (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>McKim Business School (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "McKim Business School (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "McKim Business School (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas Boca Raton LLC as operator of the FAU Global Student Success
						Program pathway to Florida Atlantic University 'FAU' (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas Boca Raton LLC as operator of the FAU Global Student Success Program pathway to Florida Atlantic University 'FAU' (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas Boca Raton LLC as operator of the FAU Global Student Success Program pathway to Florida Atlantic University 'FAU' (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas Boston LLC as operator of the International Student Success
						Program at UMass Boston pathway to University of Massachusetts
						Boston 'UMass Boston' (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas Boston LLC as operator of the International Student Success Program at UMass Boston pathway to University of Massachusetts Boston 'UMass Boston' (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas Boston LLC as operator of the International Student Success Program at UMass Boston pathway to University of Massachusetts Boston 'UMass Boston' (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas Lowell LLC as operator of Global Student Success Program at
						UMass Lowell pathway to University of Massachusetts Lowell 'UMass
						Lowell' (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas Lowell LLC as operator of Global Student Success Program at UMass Lowell pathway to University of Massachusetts Lowell 'UMass Lowell' (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas Lowell LLC as operator of Global Student Success Program at UMass Lowell pathway to University of Massachusetts Lowell 'UMass Lowell' (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Navitas New York LLC as operator of the Queens College Global
						Student Success Program pathway to Queens College, City of New York
						(Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Navitas New York LLC as operator of the Queens College Global Student Success Program pathway to Queens College, City of New York (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Navitas New York LLC as operator of the Queens College Global Student Success Program pathway to Queens College, City of New York (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						New Jersey Institute of Technology (Educo International Group)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "New Jersey Institute of Technology (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "New Jersey Institute of Technology (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Northeastern University (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Northeastern University  (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Northeastern University  (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Pace University (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Pace University (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "Pace University (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Richard Bland College lof William and Mary (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Richard Bland College lof William and Mary (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Richard Bland College lof William and Mary (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>SAE Institute of Technology, Chicago (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "SAE Institute of Technology, Chicago (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "SAE Institute of Technology, Chicago (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Seattle Pacific University (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Seattle Pacific University   (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Seattle Pacific University   (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Study Group USA Higher Education</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Study  Group  USA Higher Education",
									state: {
										detail: props.location.state.detail,
										univ: "Study  Group  USA Higher Education",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>The University of Tulsa (Kaplan International)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "The University of Tulsa (Kaplan International)",
									state: {
										detail: props.location.state.detail,
										univ: "The University of Tulsa (Kaplan International)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Uniersity of Dayton (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Uniersity of Dayton (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "Uniersity of Dayton (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Central Florida (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Central Florida (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Central Florida (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Illinois at Chicago (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Illinois at Chicago (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Illinois at Chicago (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Kansas (Shorelight)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Kansas (Shorelight)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Kansas (Shorelight)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						University of Maryland, Baltimore Count (Educo International Group)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Maryland, Baltimore Count (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Maryland, Baltimore Count (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of Nebraska–Lincoln (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Nebraska–Lincoln (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Nebraska–Lincoln (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of North Texas (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of North Texas (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "University of North Texas (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University of South Alabama (University Marketing Systems)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of South Alabama (University Marketing Systems)",
									state: {
										detail: props.location.state.detail,
										univ: "University of South Alabama (University Marketing Systems)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Academy of Art University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Academy of Art University",
									state: {
										detail: props.location.state.detail,
										univ: "Academy of Art University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Canada Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Acsenda School of Management (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Acsenda School of Management (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Acsenda School of Management (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Arbutus College (Educo International Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Arbutus College (Educo International Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Arbutus College (Educo International Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Bay River College</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Bay River College",
									state: {
										detail: props.location.state.detail,
										univ: "Bay River College",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Formation Musictechnic</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Formation Musictechnic",
									state: {
										detail: props.location.state.detail,
										univ: "Formation Musictechnic",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Fraser International College in association with Simon Fraser
						University (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Fraser International College in association with Simon Fraser University (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Fraser International College in association with Simon Fraser University (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						International College of Manitoba pathway to the University of
						Manitoba (Navitas)
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "International College of Manitoba pathway to the University of Manitoba (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "International College of Manitoba pathway to the University of Manitoba (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Ryerson University Intl College (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Ryerson University Intl College  (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "Ryerson University Intl College  (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>SAE Institute Inc (Vancouver) (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "SAE Institute Inc (Vancouver) (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "SAE Institute Inc (Vancouver) (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Seneca College of Arts and Technology</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Seneca College of Arts and Technology",
									state: {
										detail: props.location.state.detail,
										univ: "Seneca College of Arts and Technology",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Study Group Canada Higher Education</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Study Group  Canada  Higher Education",
									state: {
										detail: props.location.state.detail,
										univ: "Study Group  Canada  Higher Education",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>University Canada West (Global University Systems )</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University Canada West (Global University Systems )",
									state: {
										detail: props.location.state.detail,
										univ: "University Canada West (Global University Systems )",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>College Avalon</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "College Avalon",
									state: {
										detail: props.location.state.detail,
										univ: "College Avalon",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>NORTHWESTEXECUTIVE EDUCATION - Northwood University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "NORTHWESTEXECUTIVE EDUCATION - Northwood University",
									state: {
										detail: props.location.state.detail,
										univ: "NORTHWESTEXECUTIVE EDUCATION - Northwood University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						"Toronto School of Management - Global University Systems
						*Condition* 2 months time to perform "
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Toronto School of Management - Global University Systems *Condition* 2 months time to perform",
									state: {
										detail: props.location.state.detail,
										univ: "Toronto School of Management - Global University Systems *Condition* 2 months time to perform",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Cape Breton University (MSM Unify) - *Condition* 2 students to
						enroll
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Cape Breton University (MSM Unify) - *Condition* 2 students to enroll",
									state: {
										detail: props.location.state.detail,
										univ: "Cape Breton University (MSM Unify) - *Condition* 2 students to enroll",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						LCI Education Network -*Condtion* 2 application and 1 student
						enrolled on campus
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "LCI Education Network  -*Condtion* 2 application and 1 student enrolled on campus",
									state: {
										detail: props.location.state.detail,
										univ: "LCI Education Network  -*Condtion* 2 application and 1 student enrolled on campus",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>
						Selkirk College -(MSQUARE MEDIA) *Condition* 2 students to enroll
					</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Selkirk College -(MSQUARE MEDIA)  *Condition* 2 students to enroll ",
									state: {
										detail: props.location.state.detail,
										univ: "Selkirk College -(MSQUARE MEDIA)  *Condition* 2 students to enroll ",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Herzing College</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Herzing College",
									state: {
										detail: props.location.state.detail,
										univ: "Herzing College",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Switzerland Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>EU Business School</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "EU Business School",
									state: {
										detail: props.location.state.detail,
										univ: "EU Business School",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Glion Institute of Higher Education - Sommet Education</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Glion Institute of Higher Education - Sommet Education",
									state: {
										detail: props.location.state.detail,
										univ: "Glion Institute of Higher Education - Sommet Education",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>HTMI</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "HTMI",
									state: { detail: props.location.state.detail, univ: "HTMI" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Italy Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Domus Academy & NA</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Domus Academy & NA",
									state: {
										detail: props.location.state.detail,
										univ: "Domus Academy & NA",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>Istituto of Marangoni</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Istituto of Marangoni",
									state: {
										detail: props.location.state.detail,
										univ: "Istituto of Marangoni",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>France Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>IDRAC</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "IDRAC",
									state: { detail: props.location.state.detail, univ: "IDRAC" },
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>QS Quacquarelli Symonds Limited</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "QS Quacquarelli Symonds Limited",
									state: {
										detail: props.location.state.detail,
										univ: "QS Quacquarelli Symonds Limited",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Paris Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Istituto of Marangoni</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Istituto of Marangoni",
									state: {
										detail: props.location.state.detail,
										univ: "Istituto of Marangoni",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Netherlands Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Holland International Study Centre (Study Group)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Holland  International  Study Centre (Study Group)",
									state: {
										detail: props.location.state.detail,
										univ: "Holland  International  Study Centre (Study Group)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>

				<tr>
					<td>The Hague Pathway College (Navitas)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "The Hague Pathway College (Navitas)",
									state: {
										detail: props.location.state.detail,
										univ: "The Hague Pathway College (Navitas)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>West Indies Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>St. Gerorge's University</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "St. Gerorge's University",
									state: {
										detail: props.location.state.detail,
										univ: "St. Gerorge's University",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>Cyprus Universities</h3>

			<table>
				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>University of Nicosia (Cammino Global Education)</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "University of Nicosia (Cammino Global Education)",
									state: {
										detail: props.location.state.detail,
										univ: "University of Nicosia (Cammino Global Education)",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

			<h3>India Universities</h3>

				<tr>
					<th>university name</th>
					<th>apply</th>
				</tr>
				<tr>
					<td>Istituto Marangoni Mumbai Training Centre Private Limited</td>
					<td>
						<a
							onClick={(event) =>
								history.push({
									pathname: "/addstudentapplications",
									detail: props.location.state.detail,
									univ: "Istituto Marangoni Mumbai Training Centre Private Limited",
									state: {
										detail: props.location.state.detail,
										univ: "Istituto Marangoni Mumbai Training Centre Private Limited",
									},
								})
							}
						>
							Apply
						</a>
					</td>
				</tr>
			</table>

						*/}
		</div>
	);
};

export default AddStudentApplicationUniversity;
