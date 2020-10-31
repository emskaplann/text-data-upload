import React from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import FileUpload from './sub-components/FileUpload.js';
import AdjustSettings from './sub-components/AdjustSettings.js';
import ConfirmUpload from './sub-components/ConfirmUpload.js';
import CustomProgressBar from './sub-components/CustomProgressBar.js';
import UploadService from './services/UploadService.js';
import Papa from 'papaparse';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 1, // which step user is at
      selectedFile: null, // uploaded file 
      tableHeaders: [], // all headers system parsed from the selected file
      excludedHeaders: [], // a boolean array to keep track of excluded headers 
      assignedHeaders: [], // keeping track of assigned headers to the ID, Timestamp and Name
      assigned: { // before sending request to the backend collecting assigned headers in one object
        id: null,
        name: null,
        timestamp: null
      },
      resultsLoading: false, // when we make request this for displaying loading icon on the button
      loadResponseInfo: false, // this prop is passed to the child component(ConfirmUpload) to render the message we got from the backend
      convertingFile: false, // when we convert excel files on frontend this prop is used show loading icon
      asString: false, // when we send excel files to the backend we send them as a string so this is used indicate whether we are sending string or an actual file
    }

    this.uploadService = new UploadService(this) // setting up the class for communicating with our backend - concept is called "Dependency Injection"
    
    this.config = { // this object is passed as an argument to the JS CSV parser method
      delimiter: "",	// auto-detect
      newline: "",	// auto-detect
      quoteChar: '"',
      escapeChar: '"',
      header: false,
      transformHeader: undefined,
      dynamicTyping: false,
      preview: 1, // for getting the headers
      encoding: "",
      worker: false,
      comments: false,
      step: undefined,
      complete: this.parseComplete,
      error: undefined,
      download: false,
      downloadRequestHeaders: undefined,
      downloadRequestBody: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      chunkSize: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined,
      transform: undefined,
      delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    }

    this.unparseConfig = { // this object is passed as an argument to the JS CSV unParser method
      quotes: false, //or array of booleans
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",",
      header: true,
      newline: "\r\n",
      skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
      columns: null //or array of strings
    }
  }
  
  parseComplete = (results, parser) => { // call-back function, called when parsing operation is complete
    if(results.errors.length > 0) { // didn't add error handling for this one
      // error handling

    } else {
      // load start
      this.setState({tableHeaders: results.data[0], excludedHeaders: results.data[0].map(el => true)}, function(){ // we are assigning the first row of the parsed file as the headers and then we create the boolean array for excludedHeaders initially all values are true
        this.setState({step: 2}, function() { // When parsing is complete and we have the necessary files we move onto second step
          // load end

        })
      })
    }
  }

  onChangeHandler = event => { // this function handles changes made on the File Input
    if(event.target.files[0].name.substr(-4) === "xlsx") {
      //if file is .xlsx
      window.parseExcelXLSX(event.target.files[0], this)
    } else if(event.target.files[0].name.substr(-3) === "xls") {
      //if file is .xls
      window.parseExcelXLS(event.target.files[0], this)
    } else if(event.target.files[0].name.substr(-3) === "csv" || event.target.files[0].name.substr(-3) === "tsv") {
      //if file is .csv or .tsv
      this.setState({selectedFile: event.target.files[0]})
    } else {
      //if file is not supported
      window.alert("Our system doesn't support the file. Please convert it to one of the supported file type and then try again.")
      event.target.value = ""
    }
  }

  onChangeCheckbox = event => { // this function handles when user includes or excludes headers in the second step
    const newArr = this.state.excludedHeaders.slice()
    newArr[event.target.id] = !newArr[event.target.id]
    for(let val in this.state.assigned) {
      if(this.state.assigned[val] === this.state.tableHeaders[event.target.id]) {
        let availableHeaders = this.availableHeaders()
        let idx = availableHeaders.indexOf(this.state.tableHeaders[event.target.id])
        let newAssHeaders = this.state.assignedHeaders.filter(el => parseInt(el) === idx ? false : true)
        let targetFormInput = 0
        switch(val) {
          case "id":
            targetFormInput = 0
            break;
          case "name":
            targetFormInput = 1
            break;
          case "timestamp":
            targetFormInput = 2
            break;
          default:
            targetFormInput = 0
            break;
        }
        let input = document.getElementsByClassName("list-form-input")[targetFormInput]
        input.children[1].value = -1
        this.setState({
          assigned: {...this.state.assigned, [val]: null},
          assignedHeaders: newAssHeaders
        })
      }
    }
    this.setState({excludedHeaders: newArr})
  }

  syncAssHeadersState = () => { // this function is called when we have changes on the headers to make sure our double-source is synced with each other
    let currentAssHeaders = []
    for(let val in this.state.assigned) {
      let i = this.availableHeaders().indexOf(this.state.assigned[val])
      if(i > -1) currentAssHeaders.push(i)
    }

    this.setState({assignedHeaders: [...new Set(currentAssHeaders)]})
  }

  onChangeList = event => { // this function handles the dropdown list for assigning columns 
    let val = parseInt(event.target.value)
    if(val > -1) {
      // debugger
      if(this.state.assignedHeaders.includes(val)) {
        window.alert("You already assigned this column.")
        let idx = this.availableHeaders().indexOf(this.state.assigned[event.target.parentElement.children[0].textContent.toLowerCase()])
        event.target.value = idx
        return;
      }
      this.state.assignedHeaders.push(val)
      this.setState({assigned: {...this.state.assigned, [event.target.parentElement.firstElementChild.textContent.toLowerCase()]: this.availableHeaders()[val]}}, this.syncAssHeadersState)
    } else {
      //remove the value from assigned
      let header = this.state.assigned[event.target.parentElement.firstElementChild.textContent.toLowerCase()]
      let idx = this.availableHeaders().indexOf(header)
      let newAssHeaders = this.state.assignedHeaders.filter((el) => parseInt(el) !== idx ? true : false)
      this.setState({assigned: {...this.state.assigned, [event.target.parentElement.firstElementChild.textContent.toLowerCase()]: null}, assignedHeaders: newAssHeaders})
    }
  }

  nextButtonHandler = event => { // this function handles clicks for next button which is located right-bottom on the ui
    switch(this.state.step) {
      case 1: // in first step we check if we have an actual file or string and we act depending on that
        if(!this.state.selectedFile) {
          window.alert("Please select a file to move forward.")
        } else {
          // move forward
          if(this.state.asString) {
            const headers = []
            for (const [key, value] of Object.entries(this.state.converted[0])) {headers.push(key)} //eslint-disable-line
            this.setState({tableHeaders: headers, excludedHeaders: headers.map(el => true)}, function(){
              this.setState({step: 2}, function() {
                // load end
              })
            })
          } else {
            Papa.parse(this.state.selectedFile, this.config)
          }
          this.setState({step: 2})
        }
        break;
      case 2: // we don't have to do anything on second step
        this.setState({step: 3})
        break;
      case 3: // this where we make the request to the backend
        if(!this.state.errorType && !this.state.successfullyCompleted) {
          // send the request
          // start loading icon
          this.setState({resultsLoading: !this.state.resultsLoading})
          const form = new FormData() // creating the form object for request body
          form.append("file", this.state.selectedFile)
          form.append("table_headers", this.availableHeaders())
          form.append("id", this.state.assigned.id)
          form.append("name", this.state.assigned.name)
          form.append("timestamp", this.state.assigned.timestamp)
          form.append("as_string", this.state.asString)
          this.uploadService.uploadFileToParse(form)
          // end loading icon
        } else {
          // upload another, reset the state
          this.setState({
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
            successfullyCompleted: false,
            errorType: null,
            errorLists: null,
            convertingFile: false,
            asString: false,
            fileUrl: null,
            converted: null,
          })
        }        
        break;
      default:
        console.log(this.state.step)
    }
  }

  // Changing page title according to the current step
  renderPageTitle = () => {
    switch(this.state.step) {
      case 1:
        return "Upload Dataset"
      case 2:
        return "Adjust Settings"
      case 3:
        return "Confirm & Upload"
      default:
        console.log(this.state.step)
    }
  }

  // Filtering exlcuded headers from all headers
  availableHeaders = () => {
    return this.state.tableHeaders.filter((el, idx) => {
      if(this.state.excludedHeaders[idx]) {
        return true
      }
      return false
    })
  }
  // If user clicks cancel this function resets every state property to its initial value
  cancelUpload = event => {
    // cancel upload
    this.setState({
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
      successfullyCompleted: false,
      errorType: null,
      errorLists: null,
      convertingFile: false,
      asString: false,
      fileUrl: null,
      converted: null,
    })
  }

  renderContent = () => { // this function renders the main content on UI based on the step value we have in the state
    switch(this.state.step) {
      case 1:
        return <FileUpload onChangeHandler={this.onChangeHandler} fileLoading={this.state.convertingFile} />
      case 2:
        return <AdjustSettings availableHeaders={this.availableHeaders()} tableHeaders={this.state.tableHeaders} onChangeCheckbox={this.onChangeCheckbox} onChangeList={this.onChangeList} />
      case 3:
        return <ConfirmUpload selectedHeaders={this.availableHeaders()} assignedInfo={this.state.assigned} loadResponseInfo={this.state.loadResponseInfo} errorType={this.state.errorType} errorLists={this.state.errorLists} fileUrl={this.state.fileUrl} />
      default: 
        return <FileUpload onChangeHandler={this.onChangeHandler} />
    }
  }

  stepToProgress = () => { // this function returns the appropiate percentage for the progress bar based on step value 
    switch(this.state.step) {
      case 1:
        return 0
      case 2:
        return 50
      case 3:
        return 100
      default:
        return 0
    }
  }

  nextButtonEnabled = () => { // this function returns boolean to disable or enable or next button depending on provided inputs from the user
    switch(this.state.step) {
      case 1:
        if(this.state.selectedFile) return true
        break;
      case 2:
        if(this.state.assigned.id && this.state.assigned.name && this.state.assigned.timestamp && this.state.excludedHeaders.includes(true)) return true
        break;
      case 3:
        // if(this.state.assigned.id && this.state.assigned.name && this.state.assigned.timestamp && this.state.excludedHeaders.includes(true)) return true
        return false
        // break;
      default:
        return false
    }
  }

  render() {
    return(
      <>
      <Card className="main-container">
        <Card.Header as="div">
          <Row>
            <Col lg={4}>
              <h5 className="card-title">{this.renderPageTitle()}</h5>
            </Col>
            <Col lg={8}>
              <CustomProgressBar activatedStep={this.state.step} successfullyCompleted={this.state.successfullyCompleted} />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {this.renderContent()}
        </Card.Body>
        <Card.Footer>
          {this.state.step > 1 && !this.state.successfullyCompleted ? <Button className="cancel-button" variant="secondary" onClick={this.cancelUpload}>Cancel</Button> : null}
          {
            !this.state.resultsLoading ? <Button className="move-forward-button" variant="primary" onClick={this.nextButtonHandler} disabled={!this.nextButtonEnabled()}>{this.state.step === 3 ? this.state.errorType || this.state.successfullyCompleted ? "Upload Another" : "Server is down, because of exceeding free hours for this month." : "Next"}</Button>
            : <Button className="move-forward-button" variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </Button>
          }
        </Card.Footer>
      </Card>
      <p className="text-muted" style={{fontSize: '11px', textAlign: 'center', width: '100%'}}>created by emirhan kaplan in 2020.</p>
      </>
    )
  }
}

export default App;

// .TXT Conversion - Not Working! Because there is a lot different formats we can get from the user
// else if(event.target.files[0].name.substr(-3) === "txt") {
//   var reader = new FileReader();
//   var component = this
//   reader.onload = function(event) {
//     var cells = event.target.result.split('\n').map(function (el) { return el.split(/\s+/); });
//     var headings = cells.shift();
//     var json_object = cells.map(function (el) {
//       var obj = {};
//       for (var i = 0, l = el.length; i < l; i++) {
//         obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
//       }
//       return obj;
//     });
//     component.setState({converted: json_object}, function() {
//       //after loaded
//       const convertedToString = Papa.unparse(json_object, this.unparseConfig)
//       component.setState({convertingFile: false, selectedFile: convertedToString, asString: true})
//       console.log(convertedToString)
//     })
//   };
//   reader.readAsText(event.target.files[0]);
// } 