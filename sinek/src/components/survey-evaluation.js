import React, {useEffect, useReducer, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createEvaluationAnswer, evaluationMember} from "../repository/EvaluationRepository";
import "../styles/evaluation/survey-evaluation.css";
import "../styles/main.css";


function rankingsReducer(state, action) {
  const newState = [...state];
  switch (action.type) {
    case 'initialize':
      return Array(action.length).fill({rank: null, reason: ""});
    case 'setRank':
      newState[action.index] = {...newState[action.index], rank: action.rank};
      return newState;
    case 'setReason':
      newState[action.index] = {...newState[action.index], reason: action.reason};
      return newState;
    default:
      throw new Error();
  }
}

const Survey = props => {
  const {id} = useParams();
  const history = useHistory();
  const [members, setMembers] = useState([]);
  const [rankings, rankingsDispatch] = useReducer(rankingsReducer, []);

  useEffect(() => {
    retrieveEvaluationsMembers();
  }, []);

  const retrieveEvaluationsMembers = () => {
    evaluationMember(id)
      .then(response => {
        rankingsDispatch({type: "initialize", length: response.data.members.length});
        setMembers(response.data.members);
      })
      .catch(e => {
        console.log(e);
        history.push("/failed");
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {needsImprovementMemberId, needsImprovementReason, selfImprovement} = e.target.elements;
    const trustsFields = [...e.target.elements].filter(field => field.id.startsWith("trusts"));
    const trustsRankFields = trustsFields.filter(field => field.id.startsWith("trustsRank"));
    const trustsReasonFields = trustsFields.filter(field => field.id.startsWith("trustsReason"));
    const trustsMap = {};
    trustsRankFields.forEach(f => {
      trustsMap[f.id.split("[")[1].split("]")[0]] = {rank: f.value}
    });
    trustsReasonFields.forEach(f => {
      trustsMap[f.id.split("[")[1].split("]")[0]].reason = f.value;
    });
    const trusts = [];
    Object.entries(trustsMap).forEach((keyValue) => {
      const [key, value] = keyValue;
      trusts.push({
        memberId: key,
        rank: value.rank,
        reason: value.reason,
      })
    });
    let data = {
      trusts: trusts,
      needsImprovement: {
        memberId: needsImprovementMemberId.value,
        reason: needsImprovementReason.value,
      },
      selfImprovement: selfImprovement.value,
    };
    const results = await createEvaluationAnswer(id, data);
    console.log(results);
    history.push("/success");
  }

  const rankingsMap = {};
  rankings.map(ranking => ranking.rank).forEach((ranking, index) => {
    if (rankingsMap[ranking] === undefined) {
      rankingsMap[ranking] = [];
    }
    rankingsMap[ranking].push(index);
  });

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
              <form onSubmit={handleSubmit}>
                <div id="questionOne">
                  <div className="card-header blue pt-2 pb-0">
                    <h5 className="m-1"><strong>Q1: Who do you trust the most?</strong></h5>
                    <p className="small">Rank the members based on who you think has got your back.</p>
                  </div>

                  <div className="card-body p-4">
                    <div className="card-body row justify-content-md-center">
                      <div className="col-md-10">
                        {!!members.length && !!rankings.length && members.map((member, memberIndex) => {
                          return (
                            <div key={member._id} style={{marginBottom: "8px"}}>
                              <div className="input-group">
                                <select
                                  className="form-select"
                                  id={`trustsRank[${member._id}]`}
                                  style={{
                                    borderColor: (
                                      rankingsMap[rankings[memberIndex].rank]
                                      && rankingsMap[rankings[memberIndex].rank].length > 1
                                    ) ? "red" : "black",
                                  }}
                                  onChange={(e) => {
                                    rankingsDispatch({
                                      type: "setRank",
                                      index: memberIndex,
                                      rank: e.target.value,
                                    });
                                  }}
                                  required
                                >
                                  <option value={""} defaultValue>Choose rank</option>
                                  {members.map((m, index) => {
                                    return (
                                      <option key={index} value={index + 1}>{index + 1}</option>
                                    );
                                  })}
                                </select>
                                <label className="input-group-text justify-content-md-center"
                                       htmlFor="ranking">{member.name}</label>
                              </div>
                              {(
                                rankingsMap[rankings[memberIndex].rank].length === 1 &&
                                rankings[memberIndex].rank === members.length.toString()) && (
                                <div className="form-floating">
                                  <textarea
                                    className="form-control"
                                    placeholder={"Because..."}
                                    value={rankings[memberIndex].reason}
                                    onChange={(e) => {
                                      rankingsDispatch({
                                        type: "setReason",
                                        index: memberIndex,
                                        reason: e.target.value,
                                      });
                                    }}
                                    id={`trustsReason[${member._id}]`}
                                    required
                                  />
                                  <label htmlFor="reason" className="px-0">
                                    {`Why do you trust ${member.name} the least?`}
                                  </label>
                                </div>
                              )}
                              {(
                                rankingsMap[rankings[memberIndex].rank].length === 1 &&
                                rankings[memberIndex].rank === "1"
                              ) && (
                                <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder={"Because..."}
                                value={rankings[memberIndex].reason}
                                onChange={(e) => {
                                  rankingsDispatch({
                                    type: "setReason",
                                    index: memberIndex,
                                    reason: e.target.value,
                                  });
                                }}
                                id={`trustsReason[${member._id}]`}
                                required
                              />
                                  <label htmlFor="reason" className="px-0">
                                    {`Why do you trust ${member.name} the most?`}
                                  </label>
                                </div>
                              )}
                            </div>
                          );
                        })}

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
                        <select
                          className="form-select"
                          id="needsImprovementMemberId"
                          aria-label="Default select example"
                          required
                        >
                          <option value={""} defaultValue>Choose one</option>
                          {members.map((member) => {
                            return (
                              <option key={member._id} value={member._id}>{member.name}</option>
                            );
                          })}
                        </select>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Type Here..."
                            id="needsImprovementReason"
                            required
                          />
                          <label htmlFor="reason" className="px-0">Why?</label>
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
                            <textarea className="form-control" placeholder="Type Here..."
                                      id="selfImprovement" required/>
                            <label htmlFor="selfReflection" className="px-0">Self-Reflection</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer white text-center border-0 py-4">
                  <button type="submit" value="submit" className="btn green shadow" data-bs-toggle="modal"
                          data-bs-target="#confirmation"><i className="bi bi-envelope"/>&nbsp;Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Survey;
