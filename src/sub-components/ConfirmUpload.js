import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../App.css';

export default function ConfirmUpload(props) {
    function renderHeaders(tableHeaders) {
        const transformedArr = []
        for(let i = 0; i < tableHeaders.length; i++) {
            transformedArr.push(
                <Col lg={4} key={i}>                    
                    <span>{tableHeaders[i]}</span>
                </Col>
            )
        }
        return transformedArr
    }

    return(
        <div style={{overflow: "auto", maxHeight: '100%'}}>
            <div className="exclude-columns">
                <h6>Included Columns:</h6>
                <div className="headers-column">
                    <Row>
                        {renderHeaders(props.selectedHeaders)}
                    </Row>
                </div>
            </div>
            <div>
                <h6><b>ID, Name,</b> and <b>Timestamp</b> assignment:</h6>
                <div className="headers-column">
                    <div className="list-form-input">
                        <Row>
                            <Col>
                                <h6>ID:</h6>
                            </Col>
                            <Col>
                                {props.assignedInfo.id}
                            </Col>
                        </Row>
                    </div>
                    <div className="list-form-input">
                        <Row>
                            <Col>
                                <h6>Name:</h6>
                            </Col>
                            <Col>
                                {props.assignedInfo.name}
                            </Col>
                        </Row>
                    </div>
                    <div className="list-form-input">
                        <Row>
                            <Col>
                                <h6>Timestamp:</h6>
                            </Col>
                            <Col>
                                {props.assignedInfo.timestamp}
                            </Col>
                        </Row>                       
                    </div>
                </div>
            </div>
        </div>
    )
}