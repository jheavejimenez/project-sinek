import React, { useState, useEffect } from "react";
// import EvaluationDataService from "../services/evaluation";
import { Link } from "react-router-dom";
import "../styles/evaluation/survey-evaluation.css";
import "../styles/main.css";

const Survey = props => {
    // const [evaluations, setEvaluations] = useState([]);
    // 
    // useEffect(() => {
    // retrieveEvaluations();
    // }, []);
    // 
    // const retrieveEvaluations = () => {
    // EvaluationDataService.getAll()
    // .then(response => {
    // console.log(response.data)
    // setEvaluations(response.data);
    // })
    // .catch(e => {
    // console.log(e);
    // })
    // }

    return (
        <div id="pageSurvey" class="full-window">
            <div className="pageTitle">Request Evaluation</div>

            <div class="container py-4">
                <div class="row justify-content-md-center">
                    <div class="col-md-7">

                        <nav class="navbar m-1 p-0 shadow">
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
                        <div class="card shadow">
                            <div id="questionOne">
                                <div class="card-header blue pt-2 pb-0">
                                    <h5 class="m-1"><strong>Q1: Who do you trust the most?</strong></h5>
                                    <p class="small">Rank the members based on who you think has got your back.</p>
                                </div>
                                <div class="card-body row justify-content-md-center">
                                    <div class="col-md-10">
                                        <div class="input-group p-3">
                                            <select class="form-select" id="ranking">
                                                <option selected>Rank...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label class="input-group-text justify-content-md-center" for="ranking">Anna Hower</label>
                                        </div>

                                        <div class="input-group p-3">
                                            <select class="form-select" id="ranking">
                                                <option selected>Rank...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label class="input-group-text justify-content-md-center" for="ranking">Mark Watson</label>

                                        </div>

                                        <div class="input-group p-3">
                                            <select class="form-select" id="ranking">
                                                <option selected>Rank...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
                                            <label class="input-group-text justify-content-md-center" for="ranking">Alice Fowler</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="questionTwo">
                                <div class="card-header blue">
                                    <h5 class="m-1"><strong>Q2 : Who needs to improve the most? Why?</strong></h5>
                                </div>
                                <div class="card-body p-4">
                                    <div class="card-body row justify-content-md-center">
                                        <div class="col-md-10">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Select Name</option>
                                                <option value="1">Anna Hower</option>
                                                <option value="2">Mark Watson</option>
                                                <option value="3">Alice Fowler</option>
                                            </select>
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="Type Here..." id="reason"></textarea>
                                                <label for="reason" className="px-0">Why?</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="questionThree">
                                <div class="card-header blue">
                                    <h5 class="m-1"><strong>Q3: What do you think should you improve?</strong></h5>
                                </div>
                                <div class="card-body">
                                    <div class="form-floating">
                                        <div class="card-body row justify-content-md-center">
                                            <div class="col-md-10">
                                                <div class="form-floating">
                                                    <textarea class="form-control" placeholder="Type Here..." id="selfReflection"></textarea>
                                                    <label for="selfReflection" className="px-0">Self-Reflection</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer white text-center border-0 py-4">
                                <button type="button" class="btn green shadow" data-bs-toggle="modal" data-bs-target="#confirmation"><i class="bi bi-envelope"></i>&nbsp;Submit</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Survey;
