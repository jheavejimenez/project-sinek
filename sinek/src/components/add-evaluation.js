import React, {useState} from "react";
import {createEvaluation} from "../repository/EvaluationRepository";
import "../styles/evaluation/add-evaluation.css";
import "../styles/main.css";
import styled from 'styled-components'

const AddEvaluation = props => {
  const [membersList, setMembersList] = useState([
    {name: "", email: ""},
    {name: "", email: ""},
    {name: "", email: ""},
  ]);
  const [status, setStatus] = useState("Send Request");
  const [acceptedTnc, setAcceptedTnc] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setStatus("Sending...");
    const {teamName, managementEmail, managementName} = e.target.elements;
    let data = {
      managementEmail: managementEmail.value,
      managementName: managementName.value,
      teamName: teamName.value,
      members: membersList
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
    const {name, value} = e.target;
    const list = [...membersList];
    list[index][name] = value;
    setMembersList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...membersList];
    list.splice(index, 1);
    setMembersList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setMembersList([...membersList, {name: "", email: ""}]);
  };

  return (
    <PageEvaluationContainer>
      <PageTitle>Request Evaluation</PageTitle>
      <TeamDetailsContainer>
        <TeamDetailsTitleContainer>
          <h3 className="m-1"><strong>TEAM DETAILS</strong></h3>
        </TeamDetailsTitleContainer>
        <form onSubmit={handleSubmit}>
          <div className="card-body px-4 m-3">
            <div className="mb-3">
              <label htmlFor="managementEmail" className="form-label">Your Email: </label>
              <input type="email" className="form-control" id="managementEmail" placeholder="management@example.com"
                     name="managementEmail" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="managementName" className="form-label">Your Name: </label>
              <input type="text" className="form-control" id="managementName" placeholder="John Doe"
                     name="managementName" required/>
            </div>

            <div className="my-4">
              <label htmlFor="teamName" className="form-label">Your Team's Name: </label>
              <input type="text" className="form-control" id="teamName" placeholder="The Best Team" required/>
            </div>

            <div style={{marginTop: '16px'}}>
              <label htmlFor="teamName" className="form-label">Team Members: </label>
              {membersList.map((member, index) => {
                return (
                  <div className="box">
                    <div className="input-group" style={{display: "flex"}}>
                      <input
                        type="text"
                        className="form-control me-1"
                        placeholder="Name"
                        id="memberName"
                        name="name"
                        value={member.name}
                        style={{flex: 1}}
                        onChange={e => handleInputChange(e, index)}
                      />
                      <input
                        type="email"
                        className="form-control ms-1"
                        id="memberEmail"
                        placeholder="name@email.com"
                        name="email"
                        value={member.email}
                        style={{flex: 2}}
                        onChange={e => handleInputChange(e, index)}
                      />
                    </div>
                    <div className="btn-box">
                      {membersList.length > 3 && (
                        <DeleteButton type={"button"} onClick={() => handleRemoveClick(index)}>
                          Remove
                        </DeleteButton>
                      )}
                      {membersList.length - 1 === index && (
                        <button onClick={handleAddClick} type="button" className="btn">
                          <i className="bi bi-plus-circle"/>&nbsp;Add Member</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          <div className="card-footer white text-center py-4">
            <div className="pt-3">
              <input type="checkbox" className="form-check-input mx-2" id="terms"
                     value={acceptedTnc} onChange={e => {
                setAcceptedTnc(e.target.checked)
              }}/>
              <label className="form-check-label" htmlFor="terms">
                I agree to the <a href="#">terms and
                condition</a></label>
            </div>
            <br/>
            <button type="submit" className="btn dark m-1" disabled={!acceptedTnc}>
              <i className="bi bi-envelope"/>&nbsp;{status}
            </button>
          </div>
        </form>
      </TeamDetailsContainer>
    </PageEvaluationContainer>
  );
}

const PageEvaluationContainer = styled.div`
background-image: -webkit-gradient(linear, right top, left bottom, from(#255fea), to(#00ebc1));
background-image: linear-gradient(to bottom left, #255fea, #00ebc1);
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 100vh;

overflow: scroll;

display: flex;
flex-direction: column;
align-items: center;
`;

const PageTitle = styled.div`
font-size: 2em;
padding: 15px;
margin-bottom: 20px;
text-align: center;
background-color: #fff;

-webkit-box-shadow: 0 10px 10px 0px rgba(50, 50, 50, 0.15);
-moz-box-shadow: 0 10px 10px 0px rgba(50, 50, 50, 0.15);
box-shadow: 0 10px 10px 0px rgba(50, 50, 50, 0.15);

flex: 1;
align-self: stretch;
`;

const TeamDetailsContainer = styled.div`
margin: 8px;
background-color: white;
max-width: 567px;
border-radius: 4px;
flex: 1;
`;

const TeamDetailsTitleContainer = styled.div`
background-color: #403b31;
color: #ffffff;
padding: 8px;
text-align: center;
`;

const DeleteButton = styled.button`
border: none;
background: none;
color: red;
padding: 8px;
`;

export default AddEvaluation;
