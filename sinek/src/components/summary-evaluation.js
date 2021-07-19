import React, {useEffect, useState} from "react";
import "../styles/evaluation/summary-evaluation.css";
import "../styles/main.css";
import {useHistory, useParams} from "react-router-dom";
import {getEvaluation} from "../repository/EvaluationRepository";

const SummaryEvaluation = props => {
  const {id} = useParams();
  const history = useHistory();
  const [trusts, setTrusts] = useState(null);
  const [needsImprovementList, setNeedsImprovementList] = useState(null);
  const [selfImprovementList, setSelfImprovementList] = useState(null);

  function initialize(evaluation) {
    const memberNames = {};
    const trustsMap = {};
    const needsImprovementMap = {};

    evaluation.members.forEach(member => {
      memberNames[member._id] = member.name;
      member.answer.forEach(answer => {
        answer.trusts.forEach(trust => {
          const memberId = trust.memberId;
          if (trustsMap[memberId] === undefined) {
            trustsMap[memberId] = {score: 0, reasons: []}
          }
          trustsMap[memberId].score += trust.rank;
          if (trust.reason) {
            trustsMap[memberId].reasons.push(trust.reason);
          }
        });

        const memberId = answer.needsImprovement.memberId

        if (needsImprovementMap[memberId] === undefined) {
          needsImprovementMap[memberId] = [];
        }
        needsImprovementMap[memberId].push(answer.needsImprovement.reason);
      });
    });

    const trusts = Object.entries(trustsMap).map(kv => {
      const [key, value] = kv;
      return {
        id: key,
        name: memberNames[key],
        score: value.score,
        reasons: value.reasons,
      };
    }).sort((a, b) => a.score - b.score);
    setTrusts(trusts);

    const needsImprovementList = Object.entries(needsImprovementMap).map(kv => {
      const [key, value] = kv;
      return {
        id: key,
        name: memberNames[key],
        reasons: value,
      };
    }).sort((a, b) => a.reasons.length - b.reasons.length);
    setNeedsImprovementList(needsImprovementList);

    const selfImprovementList = evaluation.members.flatMap(member => {
      return member.answer.map(answer => ({
        name: memberNames[member._id],
        reason: answer.selfImprovement,
      }));
    });

    setSelfImprovementList(selfImprovementList);
  }

  const refresh = async () => {
    const evaluation = await getEvaluation(id)
      .then(response => {
        initialize(response.data);
      })
      .catch(e => {
        console.log(e);
        history.push("/failed");
      })
  }

  useEffect(refresh, []);

  return (
    <div id="pageSummary" className="full-window">

      <div className="pageTitle">Evaluation Summary</div>

      <div className="container py-4">
        <div className="row justify-content-md-center">
          <div className="col-md-7">

            <div className="card shadow">
              <div className="blue px-4 py-3">
                <h5 className="m-1"><strong>TEAM</strong></h5>
              </div>
              <nav className="navbar p-0 shadow">
                <ul className="nav justify-content-center text-center nav-fill col-sm-12">
                  <li className="nav-item">
                    <a className="nav-link navi" data-toggle="tab" href="#questionOne">Q1: TRUST</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link navi" data-toggle="tab" href="#questionTwo">Q2: NEEDS IMPROVEMENT</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link navi" data-toggle="tab" href="#questionThree">Q3: REFLECTION</a>
                  </li>
                </ul>
              </nav>
              <div className="card-body">
                <div id="summaryQuestion1" className="summaryQuestionContainer pt-2 pl-0 pb-4 pr-0">
                  <h4 className="questionTitle">SUMMARY of Q1: Trust</h4>
                  <div className="summaryWrapperQ1">
                    <div className="d-flex trust-header">
                      <div className="col-3">
                        <h6 className="rank-wrapper">Rank</h6>
                      </div>
                      <div className="col-3">
                        <h6>Name</h6>
                      </div>
                      <div className="col-3">
                        <h6>Score</h6>
                      </div>
                      <div className="col-3">
                        <h6>Comments</h6>
                      </div>
                    </div>
                    {trusts ? (
                      trusts.length ? (
                        trusts.map((trust, index) => (
                          <div className="d-flex trust-member" key={trust.id}>
                            <div className="col-3">
                              <h6 className="rank-wrapper">{index + 1}</h6>
                            </div>
                            <div className="col-3">
                              <h6>{trust.name}</h6>
                            </div>
                            <div className="col-3">
                              <h6>{trust.score}</h6>
                            </div>
                            <div className="col-3">
                              {trust.reasons.map((reason, index) => (
                                <div key={index}><small>{reason}</small></div>
                              ))}
                            </div>
                          </div>
                        ))) : (
                        <div>
                          <h6 className="rank-wrapper">
                            No results yet. Your team mates have yet to answer their evaluation forms.
                          </h6>
                        </div>
                      )
                    ) : (
                      <div>
                        <h6 className="rank-wrapper">
                          Loading...
                        </h6>
                      </div>
                    )}
                  </div>
                </div>

                <div id="summaryQuestion2" className="summaryQuestionContainer py-4">
                  <h4 className="questionTitle">SUMMARY of Q2: Need Improvements</h4>
                  {needsImprovementList ? (
                    needsImprovementList.length ? (
                      needsImprovementList.map(needsImprovement => (
                        <div className="d-flex">
                          <div className="col-4">
                            <h6 className="m-1">{needsImprovement.name}</h6>
                          </div>
                          <div className="col-8">
                            {needsImprovement.reasons.map((reason, index) => (
                              <p key={index}>{reason}</p>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h6 className="rank-wrapper">
                          No results yet. Your team mates have yet to answer their evaluation forms.
                        </h6>
                      </div>
                    )
                  ) : (
                    <div>
                      <h6 className="rank-wrapper">
                        Loading...
                      </h6>
                    </div>
                  )}
                </div>

                <div id="summaryQuestion3" className="summaryQuestionContainer py-4">
                  <h4 className="questionTitle">SUMMARY of Q3: Improvements</h4>
                  {selfImprovementList ? (
                    selfImprovementList.length ? (
                      selfImprovementList.map(selfImprovement => (
                        <div className="card shadow">
                          <div className="card-header blue">
                            <h5 className="m-1"><strong>{selfImprovement.name}</strong></h5>
                          </div>
                          <div className="card-body light-gray">
                            <p id="reason">{selfImprovement.reason}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h6 className="rank-wrapper">
                          No results yet. Your team mates have yet to answer their evaluation forms.
                        </h6>
                      </div>
                    )
                  ) : (
                    <div>
                      <h6 className="rank-wrapper">
                        Loading...
                      </h6>
                    </div>
                  )}
                </div>
                <div style={{textAlign: "center"}}>
                  Powered by Atmos Cloud Solutions, Inc.
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
