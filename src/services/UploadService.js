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
            console.log(response)
        })
    }
}