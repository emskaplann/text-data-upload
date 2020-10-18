import React from 'react';
import '../App.css';

export default function FileUpload(props) { 
    return(
        <div>
            <h6>Upload your dataset to this page and click next.</h6>
            <form method="post" action="#" id="#">
                <div className="form-group files">
                    <input type="file" className="form-control fc-custom" multiple="" onChange={props.onChangeHandler} />
                </div>
                <span className="text-muted">*supports .csv and .tsv file types.</span>
            </form>
        </div>
    )
}