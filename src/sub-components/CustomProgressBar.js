import React from 'react';

export default function CustomProgressBar(props) {
    return(
        <div className="myProgress">
            <div className="myBar">
                <div className="step-container" style={{width: props.activatedStep > 1 ? props.activatedStep > 2 ? "100%" : "50%" : "0%"}}>
                    <span className="step-activated"></span>
                    <span className={props.activatedStep < 2 ?"step" : "step-activated"} style={{marginLeft: "50%"}}></span>
                    <span className={props.activatedStep > 2 ? "step-activated" : "step"} style={{marginLeft: "100%"}}></span>
                </div>
            </div>
            <small className="step-text">Upload Dataset</small>
            <small className="step-text" style={{marginLeft: "50%"}}>Adjust Settings</small>
            <small className="step-text" style={{marginLeft: "100%"}}>Confirm & Upload</small>
        </div>
    )
}