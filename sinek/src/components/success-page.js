import React from "react";
import successImage from '../assets/success.png';

const SuccessPage = props => {
    return (
        <div id="pageSuccess" className="gradient full-window notice-page">

            <div className="container h-100">
              <div className="row text-center h-100">
                <div className="col my-auto">
                    <img src={successImage} alt="" width="200px" />
                    <h1><strong>SUCCESS!</strong></h1>
                    <h4>Your evaluation has been successfully submitted.<br />Thank you for participating in our peer evaluation!</h4>
                </div>
              </div>
            </div>
        </div>
    )
}

export default SuccessPage;