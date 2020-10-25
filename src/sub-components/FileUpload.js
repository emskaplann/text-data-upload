import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../App.css';

export default function FileUpload(props) { 
    if(props.convertingFile) {
        return(
            <div>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    } else {
        return(
            <div>
                <h6>Upload your dataset to this page and click next.</h6>
                <form method="post" action="#" id="#">
                    <div className="form-group files">
                        <input type="file" className="form-control fc-custom" multiple="" onChange={props.onChangeHandler} />
                    </div>
                    <span className="text-muted">*supports .csv, .tsv, .xlsx and .xls file types.</span>
                </form>
            </div>
        )
    }
}