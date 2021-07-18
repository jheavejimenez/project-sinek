import React, { useState, useEffect } from "react";
import { createEvaluation } from "../repository/AddEvaluation";
import "../styles/evaluation/add-evaluation.css";
import "../styles/main.css";

const AddEvaluation = props => {
    const [inputList, setInputList] = useState([{ memberName: "", memberEmail: "" }]);
    const [status, setStatus] = useState("Send Request");

    const handleSubmit = e => {
        e.preventDefault();
        setStatus("Sending...");
        const { teamName, managementEmail } = e.target.elements;
        console.log(teamName.value);
        let data = {
            managementEmail: managementEmail.value,
            teamName: teamName.value,
            members: inputList
            // email: email.value,
            // message: message.value,
          };

        // console.log(data);
        console.log(data);
        createEvaluation(data)
            .then(response => {
                // console.log(response.data);
				setStatus("Send Request");
				alert('Form Sent');
            })
            .catch(e => {
                console.log(e);
            })
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
     
        // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
     
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { memberName: "", memberEmail: "" }]);
    };

    return (
	<div id="pageEvaluation" class="gradient full-window">
		<div className="pageTitle">Request Evaluation</div>
    	<div class="container py-4">
    	<div class="row justify-content-md-center">
    	<div class="card shadow col col-6 g-0">
    	  	<div class="card-header text-center dark">
    	  	  	<h3 class="m-1"><strong>TEAM DETAILS</strong></h3>
    	  	</div>
			<form onSubmit={handleSubmit}>
    	  		<div class="card-body px-4 m-3">
    	  		  	<div class="mb-3">
    	  				<label for="managementEmail" class="form-label">Management Email: </label>
    	  				<input type="email" class="form-control" id="managementEmail" placeholder="management@example.com" required />
    	  		  	</div>

    	    		<div class="my-4">
    	    	  	  	<label for="teamName" class="form-label">Team Name: </label>
    	    	  	  	<input type="text" class="form-control" id="teamName" placeholder="Team Name" required />
    	    	  	</div>

            		<div class="my-4">
                		<label for="teamName" class="form-label">Team Members: </label>
						{inputList.map((x, i) => {
            			return (
							<div className="box">
                				<div class="input-group">
                				  <input
								  	type="text" 
									class="form-control me-1"
									placeholder="Name"
								  	name="memberName"
								  	value={x.memberName}
								  	onChange={e => handleInputChange(e, i)}
									/>
                				  <input 
								  	type="email" 
									class="form-control ms-1" 
									id="memberEmail"
									placeholder="name@email.com"
								  	name="memberEmail"
								  	value={x.memberEmail}
								  	onChange={e => handleInputChange(e, i)}
								  />
                				</div>
                	    		<div className="btn-box">
                	    		    {inputList.length !== 1 && <button className="btn remove-btn" onClick={() => handleRemoveClick(i)}>Remove</button>}
                	    		    {inputList.length - 1 === i && <button onClick={handleAddClick} type="button" class="btn"><i class="bi bi-plus-circle"></i>&nbsp;Add Member</button>}
                	    		</div>
							</div>
          				  	);
          				})}
                	</div>
					
				</div>
					
				<div class="card-footer white text-center py-4">
					<button type="submit" class="btn dark m-1"><i class="bi bi-envelope"></i>&nbsp;{status}</button>
            	  	<br />
            	  	<div className="pt-3">
            	  	  	<input type="checkbox" class="form-check-input mx-2" id="terms" />
            	  	  	<label class="form-check-label" for="terms">I agree to the <a href="#">terms and condition</a></label>
            	  	</div>
            	</div>
			</form>
    	</div>
    	</div>
    	</div>
    </div>
	);
}

export default AddEvaluation;
