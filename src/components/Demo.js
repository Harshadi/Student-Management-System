import React, { useContext, useState, useEffect, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";

const Demo = (props) => {
	const history = useHistory();
	const { currentUser } = useContext(AuthContext);
	const [id, setId] = useState("");
	const [details, setDetails] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const inputEl = useRef("");
	const [studentId, setStudentId] = useState([]);
	const [completeApplication, setCompleteApplication] = useState(0);
	
	var applicationFormSubmitted = 0;
	const item = [];
	const [posts, setPosts] = useState([]);
	const [postsAnother, setPostsAnother] = useState([1, 2, 3, 4, 5]);
	const [demo, setDemo] = useState([]);
	var complete = 0;
	var incomplete = 0;
	var inProgress = 0;
	const [com, setCom] = useState(0);
	const [incom, setIncom] = useState(0);
	const [inprog, setInprog]= useState(0);


	useEffect(() => {
		var applications = [];
		const hospitals = [];
		const studentId = [];
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
				//  console.log(details);
			});

		// console.log("postdta", posts)

		// posts.map((post)=>(

		//  firebaseConfig
		//         .firestore()
		//         .collection("counselor")
		//         .doc(currentUser.uid)
		//         .collection("studentDetails")
		// 	.doc(post.id)
		// 	.collection('studentApplications')
		// 	 .get()
		//   .then(querySnapshot => {
		// const doc = []
		//     const documents = querySnapshot.docs.map(doc => doc.data())
		//    doc.push(documents)
		// setPostsAnother(postsAnother)
		//   }),

		// console.log(postsAnother)

		// ))

		console.log("1st useeffect");
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



	if (!currentUser) {
		return <Redirect to="/login" />;
	}

	return (
		<div>
			{/*{console.log("zuzi", complete, com)}
			 

{
console.log("returnpostdata",posts)
}

{
        
details.map((detail)=>(

    console.log('inside detail'),
    firebaseConfig
        .firestore()
        .collection("counselor")
        .doc(currentUser.uid)
        .collection("studentDetails")
        .doc(detail.id)
        .collection('studentApplications')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((detail) => {
                let currentID = detail.id;
                let appObj = { ...detail.data(), ["id"]: currentID };
                studentId.push(appObj);

                studentId.push(detail.data());
            });
            setStudentId(studentId);
             console.log(studentId[1]);


              studentId.map((item)=>(

<h1>
{item.applicationStatus}
</h1>
))


        })
    
  


)),
console.log('return', console.log(studentId))
} */}

			{/* 
{console.log('after return',postsAnother[0])}

{console.log('after arrra',item)}
{console.log('demoout', demo)} */}

			{/* {
   
demo.map((key)=>{
  
    if(key == 'PaymentFormFilled'){
        complete = complete +1
        console.log(complete)
    }
    console.log(complete)
})






} */}

			{/* 
{console.log('before complete',com )}
{complete}
{incomplete}
{inProgress}
{completeApplication} */}

			<table className="studentTable">
				<tr className="tableRow">
					<th className="headingRow">Application Status</th>
					<th className="headingRow">Number of Applications</th>
					<th className="headingRow">View</th>
				</tr>
				<tr>
					<td>Complete</td>
					<td>
						{/* {console.log("above complete", complete)} */}
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
		</div>
	);
};

export default Demo;
