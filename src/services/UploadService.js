export default class UploadService {
    constructor(component) {
        this.testURL = "http://localhost:3000/text_data_files" // local server url for testing on local server
        this.prodURL = "https://calm-ocean-20734.herokuapp.com/text_data_files" // production url which is hosted on heroku, if the server is asleep you may need to wait around 20 seconds to get a response back
        this.component = component
    }

    cancelUploadAndShowError(error) { // this function displays alert messages if request to the backend fails and before it resets the state of the App Component
        const errorMsg = error ? ` Here is the error message: ${error}` : ""
        this.component.setState({
            step: 1,
            selectedFile: null,
            tableHeaders: [],
            excludedHeaders: [],
            assignedHeaders: [],
            assigned: {
                id: null,
                name: null,
                timestamp: null
            },
            resultsLoading: false,
            loadResponseInfo: false,
            convertingFile: false,
            asString: false,
        }, function() {
            window.alert("Ooops! Something went wrong please try again." + errorMsg)
        })
    }

    uploadFileToParse(requestBody) { // this is the fetch function where we actually make the request and handle the response
        fetch(this.prodURL, { // changing prod - test from here for server
            method: "POST",
            body: requestBody
        })
        .then(r => r.json())
        .then(response => {
            if(!response.error && !response.link) {
                // server didn't respond as expected
                this.cancelUploadAndShowError()
            } else if(response.error) {
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
            } else {
                //handle success
                this.component.setState({fileUrl: response.link}, () => {
                    this.component.setState({loadResponseInfo: true}, () => {
                        this.component.setState({resultsLoading: !this.component.state.resultsLoading, successfullyCompleted: true})
                    })
                })
            }
        })
        .catch(error => this.cancelUploadAndShowError(error))
    }
}