import React from 'react';
import { Row, Col } from 'react-bootstrap';
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

    function generateErrorMessage(errorType) {
        // errorType: 0 => both, 1 => duplicate_id, 2 => non_convertible_timestamp
        switch(errorType) {
            case 0:
                return <u>were duplicate id's and non-convertible timestamps.</u>
            case 1:
                return <u>were duplicate id's.</u>
            case 2:
                return <u>were non-convertible timestamps.</u>
            default:
                return <u>were duplicate id's and non-convertible timestamps.</u>
        }
    }

    function transformArraysIntoList(arr, double) {
        const transformedArr = []
        for(let i = 0; i < arr.length; i++) {
            transformedArr.push(<Col key={i} lg={double ? 4 : 3}>{arr[i]}</Col>)
        }
        return transformedArr
    }

    function generateIdLists(errorLists) {
        if(errorLists.duplicate_id_list && errorLists.non_convertible_timestamp_id_list) {
            return(
                <div>
                    <Row>
                        <Col>
                            Duplicate ID's:
                            <Row>
                                {transformArraysIntoList(errorLists.duplicate_id_list, true)}
                            </Row>
                        </Col>
                        <Col>
                            ID's of the non-convertible timestamps:
                            <Row>
                                {transformArraysIntoList(errorLists.non_convertible_timestamp_id_list, true)}
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        } else if(errorLists.duplicate_id_list) {
            return(
                <div>
                    Duplicate ID's:
                    <Row>
                        {transformArraysIntoList(errorLists.duplicate_id_list, false)}
                    </Row>
                </div>
            )
        } else {
            return(
                <div>
                    ID's of the non-convertible timestamps:
                    <Row>
                        {transformArraysIntoList(errorLists.non_convertible_timestamp_id_list, false)}
                    </Row>
                </div>
            )
        }
    }

    function renderResponseInfo(bool) {
        if(bool) {
            if(props.fileUrl) {
                // success
                return(
                    <div className="response-info">
                        <h6><b>Your dataset was succesfully imported to our system.</b> You can upload another dataset if you'd like to.</h6>
                        <br />
                        <b><a href={props.fileUrl}>Download the imported dataset.</a></b>
                    </div>
                )
            } else {
                // error
                return(
                    <div className="response-info">
                        <h6>{"We couldn't import your file because there "}{generateErrorMessage(props.errorType)}</h6>
                        {generateIdLists(props.errorLists)}
                    </div>
                )
            }
        }
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
            {renderResponseInfo(props.loadResponseInfo)}
        </div>
    )
}