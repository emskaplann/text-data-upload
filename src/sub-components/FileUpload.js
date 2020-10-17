import React from 'react';
import '../App.css';

export default function FileUpload(props) { 
    return(
        <form method="post" action="#" id="#">
            <div className="form-group files">
                <input type="file" className="form-control" multiple="" onChange={props.onChangeHandler} />
            </div>
            <span className="text-muted">*supports .csv and .tsv file types.</span>
        </form>
    )
}