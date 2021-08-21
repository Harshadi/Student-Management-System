import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import "./style.css";
import firebaseConfig from "./../config";

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	const history = useHistory();
	return (
		<>
			<h1 className="homeTitle">Home</h1>
			{currentUser ? (
				history.push("/dashboard")
			) : (
				// 	<p>
				//	<button
				//	className="signoutBtn"
				//	onClick={() => history.push('/references')}
				//>
				//	References
				//</button>
				//<button
				//	className="signoutBtn"
				//	onClick={() => firebaseConfig.auth().signOut()}
				//>
				//	Sign out
				// </button> <br/> <br/> <br/>
				//<h4 className="loginBtn">You are logged -</h4>
				//<Link to="/dashboard" className="dashboardBtn"><h4 className="dashboardHeading">View Dashboard</h4></Link>
				// 	</p>
				<p className="homeData">
					<Link to="/login" className="loginBtn">
						Log In
					</Link>
					<p className="or">or</p>{" "}
					<Link to="/signup" className="signupBtn">
						Sign Up
					</Link>
				</p>
			)}
		</>
	);
};

export default Home;
