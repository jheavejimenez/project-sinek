import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Evaluation = props => {
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        retrieveEvaluations();
    }, []);

    const retrieveEvaluations = () => {
        EvaluationDataService.getAll()
            .then(response => {
                console.log(response.data)
                setEvaluations(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
      <div className="container">
        {evaluations.map((evaluation) => {
            return (
                <div key={evaluation._id}>{evaluation.teamName}</div>
            )
        })}
      </div>
    );
}

export default Evaluation;
