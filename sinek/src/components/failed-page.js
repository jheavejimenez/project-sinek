import React from "react";
import failedImage from '../assets/error.png';

const FailedPage = props => {
    return (
        <div id="pageFailed" className="failed-gradient full-window notice-page">

            <div className="container h-100">
              <div className="row text-center h-100">
                <div className="col my-auto">
                    <img src={failedImage} alt="" width="200px" />
                    <h1><strong>The page you are trying to access does not exist.</strong></h1>
                    <h4>This might be because you have already answered the evaluation.</h4>
                </div>
              </div>
            </div>
        </div>
    )
}

export default FailedPage;