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
        <div id="pageSurvey" class="full-window">

            <div className="pageTitle">Request Evaluation</div>

            <div class="container py-4">
                <div class="row justify-content-md-center">
                    <div class="col-md-7">

                        <div class="card shadow">
                            <div class="blue px-4 py-3">
                                <h5 class="m-1"><strong>Jane Doe</strong></h5>
                            </div>
                            <nav class="navbar p-0 shadow">
                                <ul class="nav justify-content-center text-center nav-fill col-sm-12">
                                    <li class="nav-item">
                                        <a class="nav-link navi active" data-toggle="tab" href="#questionOne">Q1: TRUST</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link navi" data-toggle="tab" href="#questionTwo">Q2: NEEDS IMPROVEMENT</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link navi" data-toggle="tab" href="#questionThree">Q3: REFLECTION</a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="card-body">
                                <div id="summary-question-1" class="summary-question-container pt-2 pl-0 pb-4 pr-0">
                                    <h4>SUMMARY of Q1: Trust</h4>
                                    <div className="d-flex trust-header">
                                        <div className="col-4">
                                            <h6>Rank</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>Name</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>Count</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex trust-member">
                                        <div className="col-4">
                                            <h6>1</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>Jane Doe</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>3 out of 4</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex trust-member">
                                        <div className="col-4">
                                            <h6>2</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>Jane Doe</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>3 out of 4</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex trust-member">
                                        <div className="col-4">
                                            <h6>3</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>Jane Doe</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>3 out of 4</h6>
                                        </div>
                                    </div>
                                </div>

                                <div id="summary-question-2" class="summary-question-container py-4">
                                    <h4>SUMMARY of Q2: Need Improvements</h4>
                                    <div class="d-flex">
                                        <div class="col-4">
                                            <h6 class="m-1"><strong>Jane Doe</strong></h6>
                                        </div>
                                        <div class="col-8">
                                            <p id="reason">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                                        </div>
                                    </div>
                                </div>

                                <div id="summary-question-3" class="summary-question-container py-4">
                                    <h4>SUMMARY of Q3: Improvements</h4>
                                    <div class="card shadow">
                                        <div class="card-header blue">
                                            <h5 class="m-1"><strong>Jane Doe</strong></h5>
                                        </div>
                                        <div class="card-body light-gray">
                                            <p id="reason">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddEvaluation;
