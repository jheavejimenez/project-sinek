import { Switch, Route, Link } from "react-router-dom";
import './App.css';

import Evaluation from "./components/evaluation";
import AddEvaluation from "./components/add-evaluation";
import SurveyEvaluation from "./components/survey-evaluation";
import SummaryEvaluation from "./components/summary-evaluation";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/evaluation"}>Evaluation</Link>
          <Link to={"/evaluation-add"}>Evaluation Add</Link>
          <Link to={"/evaluation-survey"}>Evaluation Survey</Link>
          <Link to={"/evaluation-summary"}>Evaluation Survey</Link>
        </li>
      </ul>
    
      <div className="content-container">
        <Switch>
          <Route  path="/evaluation" component={Evaluation} />
          <Route  path="/evaluation-add" component={AddEvaluation} />
          <Route  path="/evaluation-survey" component={SurveyEvaluation} />
          <Route  path="/evaluation-summary" component={SummaryEvaluation} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
