import React, { useState, useEffect } from "react";
import "../styles/evaluation/summary-evaluation.css";
import "../styles/main.css";

const SummaryEvaluation = props => {

    return (
        <div id="pageSummary" class="full-window">

            <div className="pageTitle">Evaluation Summary</div>

            <div class="container py-4">
                <div class="row justify-content-md-center">
                    <div class="col-md-7">

                        <div class="card shadow">
                            <div class="blue px-4 py-3">
                                <h5 class="m-1"><strong>TEAM</strong></h5>
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
                                <div id="summaryQuestion1" class="summaryQuestionContainer pt-2 pl-0 pb-4 pr-0">
                                    <h4 className="questionTitle">SUMMARY of Q1: Trust</h4>
                                <div class="summaryWrapperQ1">
                                    <div className="d-flex trust-header">
                                        <div className="col-4">
                                            <h6 className="rank-wrapper">Rank</h6>
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
                                            <h6 className="rank-wrapper">1</h6>
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
                                            <h6 className="rank-wrapper">2</h6>
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
                                            <h6 className="rank-wrapper">3</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>Jane Doe</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>3 out of 4</h6>
                                        </div>
                                    </div>
                                </div>
                                </div>

                                <div id="summaryQuestion2" class="summaryQuestionContainer py-4">
                                    <h4 className="questionTitle">SUMMARY of Q2: Need Improvements</h4>
                                    <div class="d-flex">
                                        <div class="col-4">
                                            <h6 class="m-1">Jane Doe</h6>
                                        </div>
                                        <div class="col-8">
                                            <p id="reason">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                                        </div>
                                    </div>
                                </div>

                                <div id="summaryQuestion3" class="summaryQuestionContainer py-4">
                                    <h4 className="questionTitle">SUMMARY of Q3: Improvements</h4>
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

export default SummaryEvaluation;
