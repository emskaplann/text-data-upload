import React from 'react';

export default function CustomProgressBar(props) { // this is the custom progress bar built for specifically this project
    const step = props.activatedStep
    return(
        <div className="myProgress">
            <div className="myBar">
                <div className="step-container" style={{width: step > 1 ? step > 2 ? "100%" : "50%" : "0%"}}>
                    <span className={step === 1 ? "step-activated" : "step-completed"}><span className="check-mark" style={{display: step === 1 ? "none" : "block"}}>✓</span></span>
                    <span className={step < 2 ? "step" : step === 2 ? "step-activated" : "step-completed"} style={{marginLeft: "50%"}}><span className="check-mark" style={{display: step === 3 ? "block" : "none"}}>✓</span></span>
                    <span className={step > 2 ? props.successfullyCompleted ? "step-completed" : "step-activated" : "step"} style={{marginLeft: "100%"}}><span className="check-mark" style={{display: !props.successfullyCompleted ? "none" : "block"}}>✓</span></span>
                </div>
            </div>
            <small className="step-text">Upload Dataset</small>
            <small className="step-text" style={{marginLeft: "50%"}}>Adjust Settings</small>
            <small className="step-text" style={{marginLeft: "97%"}}>Confirm & Upload</small>
        </div>
    )
}