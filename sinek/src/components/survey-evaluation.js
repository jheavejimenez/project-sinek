import React, { useState, useEffect } from "react";
// import EvaluationDataService from "../services/evaluation";
import { Link } from "react-router-dom";
import "../styles/evaluation/survey-evaluation.css";
import "../styles/main.css";

const Survey = props => {
    const [members, setMembers] = useState([]);
    // 
    // useEffect(() => {
    //     retrieveEvaluations();
    // }, []);
    
    console.log(props.match.params.id);
    // const retrieveEvaluations = () => {
    //     EvaluationDataService.getAll()
    //         .then(response => {
    //             response.data.forEach( (member) => {
    //                 setMembers(member.members);
    //             });
                
    //             // setEvaluations(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    // }

    return (
        <div id="pageSurvey" className="full-window">
            <div className="pageTitle">Request Evaluation</div>

            <div className="container py-4">
                <div className="row justify-content-md-center">
                    <div className="col-md-7">

                        <nav className="navbar m-1 p-0 shadow">
                            <ul className="nav justify-content-center text-center nav-fill col-sm-12">
                                <li className="nav-item">
                                    <a className="nav-link navi active" data-toggle="tab" href="#questionOne">Q1: TRUST</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link navi" data-toggle="tab" href="#questionTwo">Q2: NEEDS IMPROVEMENT</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link navi" data-toggle="tab" href="#questionThree">Q3: REFLECTION</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="card shadow">
                            <div id="questionOne">
                                <div className="card-header blue pt-2 pb-0">
                                    <h5 className="m-1"><strong>Q1: Who do you trust the most?</strong></h5>
                                    <p className="small">Rank the members based on who you think has got your back.</p>
                                </div>

                                {members.map( (member) => {
                                    return (
                                        <div>{member._id}</div>
                                    );
                                })}

                                <div className="card-body row justify-content-md-center">
                                    <div className="col-md-10">
                                        <div className="input-group p-3">
                                            <select className="form-select" id="ranking">
                                                <option selected>Rank...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label className="input-group-text justify-content-md-center" for="ranking">Anna Hower</label>
                                        </div>

                                        <div className="input-group p-3">
                                            <select className="form-select" id="ranking">
                                                <option selected>Rank...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label className="input-group-text justify-content-md-center" for="ranking">Mark Watson</label>

                                        </div>

                                        <div className="input-group p-3">
                                            <select className="form-select" id="ranking">
                                                <option selected>Rank...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label className="input-group-text justify-content-md-center" for="ranking">Alice Fowler</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="questionTwo">
                                <div className="card-header blue">
                                    <h5 className="m-1"><strong>Q2 : Who needs to improve the most? Why?</strong></h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="card-body row justify-content-md-center">
                                        <div className="col-md-10">
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Select Name</option>
                                                <option value="1">Anna Hower</option>
                                                <option value="2">Mark Watson</option>
                                                <option value="3">Alice Fowler</option>
                                            </select>
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Type Here..." id="reason"></textarea>
                                                <label for="reason" className="px-0">Why?</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="questionThree">
                                <div className="card-header blue">
                                    <h5 className="m-1"><strong>Q3: What do you think should you improve?</strong></h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-floating">
                                        <div className="card-body row justify-content-md-center">
                                            <div className="col-md-10">
                                                <div className="form-floating">
                                                    <textarea className="form-control" placeholder="Type Here..." id="selfReflection"></textarea>
                                                    <label for="selfReflection" className="px-0">Self-Reflection</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer white text-center border-0 py-4">
                                <button type="button" className="btn green shadow" data-bs-toggle="modal" data-bs-target="#confirmation"><i className="bi bi-envelope"></i>&nbsp;Submit</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Survey;
