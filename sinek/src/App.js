import { Switch, Route, Link } from "react-router-dom";
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
      <ul>
        <li>
          <Link to={"/evaluation"}>Evaluation</Link>
          <Link to={"/evaluation-add"}>Evaluation Add</Link>
          <Link to={"/evaluation-survey"}>Evaluation Survey</Link>
          <Link to={"/evaluation-summary"}>Evaluation Survey</Link>
          <Link to={"/success"}>SuccessPage</Link>
          <Link to={"/failed"}>SuccessPage</Link>
        </li>
      </ul>
    
      <div className="content-container">
        <Switch>
          <Route  path="/evaluation" component={Evaluation} />
          <Route  path="/evaluation-add" component={AddEvaluation} />
          <Route  path="/evaluation-survey/:id/:memberId" component={SurveyEvaluation} />
          <Route  path="/evaluation-summary" component={SummaryEvaluation} />
          <Route  path="/success" component={SuccessPage} />
          <Route  path="/failed" component={FailedPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
