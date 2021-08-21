import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";
import AddUser from "./components/AddUser";
import EditStudent from "./components/EditStudent";
import References from "./components/References";
import Applications from "./components/Applications";
import Applicants from "./components/Applicants";
import ViewStudent from "./components/ViewStudent";
import Count from "./components/Count";
import ApplicationsIncomplete from "./components/ApplicationsIncomplete";
import ApplicationsComplete from "./components/ApplicationsComplete";
import ApplicationsInProgress from "./components/ApplicationsInProgress";
import StudentApplications from "./components/StudentApplications";
import AddStudentApplications from "./components/AddStudentApplications";
import Attachments from "./components/Attachments";
import AddStudentApplicationUniversity from "./components/AddStudentApplicationUniversity";
import PaymentHistory from "./components/PaymentHistory";
import AddPaymentHistory from "./components/AddPaymentHistory";
import Demo from "./components/Demo";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/login" component={LogIn} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/adduser" component={AddUser} />
					<Route exact path="/editstudent" component={EditStudent} />
					<Route exact path="/references" component={References} />
					<Route exact path="/applications" component={Applications} />
					<Route exact path="/applicants" component={Applicants} />
					<Route exact path="/view" component={ViewStudent} />
					<Route exact path="/count" component={Count} />
					<Route
						exact
						path="/applicationsincomplete"
						component={ApplicationsIncomplete}
					/>
					<Route
						exact
						path="/applicationscomplete"
						component={ApplicationsComplete}
					/>
					<Route
						exact
						path="/applicationsinprogress"
						component={ApplicationsInProgress}
					/>
					<Route
						exact
						path="/studentapplications"
						component={StudentApplications}
					/>
					<Route
						exact
						path="/addstudentapplications"
						component={AddStudentApplications}
					/>
					<Route exact path="/attachments" component={Attachments} />
					<Route
						exact
						path="/addstudentapplicationuniversity"
						component={AddStudentApplicationUniversity}
					/>
					<Route exact path="/paymenthistory" component={PaymentHistory} />
					<Route
						exact
						path="/addpaymenthistory"
						component={AddPaymentHistory}
					/>
					<Route exact path="/demo" component={Demo} />
				</Switch>
			</Router>
		</AuthProvider>
	);
};

export default App;
