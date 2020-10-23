export default class UploadService {
    constructor(component) {
        this.testURL = "http://localhost:3000/text_data_files"
        this.prodURL = ""
        this.component = component
    }

    uploadFileToParse(requestBody) {
        fetch(this.testURL, {
            method: "POST",
            body: requestBody
        })
        .then(r => r.json())
        .then(response => {
            if(response.error) {
                // handle error
                // errorType: 0 => both, 1 => duplicate_id, 2 => non_convertible_timestamp
                let errorType = null
                let errorLists = null
                if(response.duplicate_id_list_length > 0 && response.non_convertible_timestamp_id_list_length > 0) {
                    errorType = 0
                    errorLists = {
                        duplicate_id_list: response.duplicate_id_list,
                        non_convertible_timestamp_id_list: response.non_convertible_timestamp_id_list
                    }
                } else if(response.duplicate_id_list_length > 0) {
                    errorType = 1
                    errorLists = {
                        duplicate_id_list: response.duplicate_id_list,
                    }
                } else {
                    errorType = 2
                    errorLists = {
                        non_convertible_timestamp_id_list: response.non_convertible_timestamp_id_list
                    }
                }
                this.component.setState({errorType: errorType, errorLists: errorLists}, () => {
                    this.component.setState({loadResponseInfo: true}, () => {
                        this.component.setState({resultsLoading: !this.component.state.resultsLoading})
                    })
                })
            } else if(response.success) {
                //handle success

            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}