import React, { useState, useEffect } from "react";
import EvaluationDataService from "../services/evaluation";
import "../styles/evaluation/add-evaluation.css";
import "../styles/main.css";

const AddEvaluation = props => {
//     const [inputList, setInputList] = useState([{ memberName: "", memberEmail: "" }]);
//     const [status, setStatus] = useState("Send Request");

//     const handleSubmit = e => {
//         e.preventDefault();
//         setStatus("Sending...");
//         const { teamName, managementEmail } = e.target.elements;
//         console.log(teamName.value);
//         let data = {
//             managementEmail: managementEmail.value,
//             teamName: teamName.value,
//             members: inputList
//             // email: email.value,
//             // message: message.value,
//           };

//         console.log(data);
//         EvaluationDataService.createEvaluation(data)
//             .then(response => {
//                 console.log(response.data)
//                 // setEvaluations(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             })
//     }

//     // handle input change
//     const handleInputChange = (e, index) => {
//         const { name, value } = e.target;
//         const list = [...inputList];
//         list[index][name] = value;
//         setInputList(list);
//     };
     
//         // handle click event of the Remove button
//     const handleRemoveClick = index => {
//         const list = [...inputList];
//         list.splice(index, 1);
//         setInputList(list);
//     };
     
//     // handle click event of the Add button
//     const handleAddClick = () => {
//         setInputList([...inputList, { memberName: "", memberEmail: "" }]);
//     };

    return (
	<div id="pageSurvey" class="gradient full-window">
		
    </div>
	);
}

export default AddEvaluation;
