import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../App.css';

export default function AdjustSettings(props) { // Adjust Settings Content
    function renderHeaders(tableHeaders) { // this function renders availableHeaders to user
        const transformedArr = []
        for(let i = 0; i < tableHeaders.length; i++) {
            transformedArr.push(
                <Col lg={4} key={i}>
                    <Form.Group controlId={i} key={i}>
                        <Form.Check type="checkbox" label={tableHeaders[i]} defaultChecked={true} onChange={props.onChangeCheckbox} />
                    </Form.Group>
                </Col>
            )
        }
        return transformedArr
    }

    function renderAvailableOptions(options) { // this function renders available option in dropdown lists
        const transformedArr = []
        for(let i = 0; i < options.length; i++) {
            transformedArr.push(<option key={i} value={i}>{options[i]}</option>)
        }
        return transformedArr
    }

    return(
        <div style={{overflow: "auto", maxHeight: '100%'}}>
            <div className="exclude-columns">
                <h6>Exclude columns by untoggling the checkbox.</h6>
                <div className="headers-column">
                    <Row>
                        {renderHeaders(props.tableHeaders)}
                    </Row>
                </div>
            </div>
            <div>
                <h6>Choose included columns to uniquely assign to <b>ID, Name,</b> and <b>Timestamp.</b></h6>
                <div className="headers-column">
                    <div className="list-form-input">
                        <Form.Label><b>ID</b></Form.Label>
                        <Form.Control className="fc-custom2" as="select" defaultValue={null} onChange={props.onChangeList}>
                            <option key={"selectVal"} value="-1">Select Value</option>
                            {renderAvailableOptions(props.availableHeaders)}
                        </Form.Control>
                    </div>
                    <div className="list-form-input">
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control className="fc-custom2" as="select" defaultValue={null} onChange={props.onChangeList}>
                            <option key={"selectVal"} value="-1">Select Value</option>
                            {renderAvailableOptions(props.availableHeaders)}
                        </Form.Control>
                    </div>
                    <div className="list-form-input">
                        <Form.Label><b>Timestamp</b></Form.Label>
                        <Form.Control className="fc-custom2" as="select" defaultValue={null} onChange={props.onChangeList}>
                            <option key={"selectVal"} value="-1">Select Value</option>
                            {renderAvailableOptions(props.availableHeaders)}
                        </Form.Control>
                    </div>
                </div>
            </div>
        </div>
    )
}