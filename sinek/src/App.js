import {Link, Route, Switch} from "react-router-dom";
import React from "react";
import './App.css';

import Evaluation from "./components/evaluation";
import AddEvaluation from "./components/add-evaluation";
import SurveyEvaluation from "./components/survey-evaluation";
import SummaryEvaluation from "./components/summary-evaluation";
import SuccessPage from "./components/success-page";
import FailedPage from "./components/failed-page";

function App() {
  return (
    <div>
      <div className="content-container">
        <Switch>
          <Route path="/evaluation" component={Evaluation}/>
          <Route path="/evaluation-survey/:id" component={SurveyEvaluation}/>
          <Route path="/evaluation-summary/:id" component={SummaryEvaluation}/>
          <Route path="/success" component={SuccessPage}/>
          <Route path="/failed" component={FailedPage}/>
          <Route path="/" component={AddEvaluation}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
