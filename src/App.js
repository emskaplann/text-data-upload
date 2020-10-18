import React from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { ProgressBar, Step } from 'react-step-progress-bar';
import FileUpload from './sub-components/FileUpload.js';
import AdjustSettings from './sub-components/AdjustSettings.js';
import ConfirmUpload from './sub-components/ConfirmUpload.js';
import UploadService from './services/UploadService.js';
import Papa from 'papaparse';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 1,
      selectedFile: null,
      tableHeaders: [],
      excludedHeaders: [],
      assignedHeaders: [],
      assigned: {
        id: null,
        name: null,
        timestamp: null
      }
    }

    this.uploadService = new UploadService(this)
    //  {
    //    file: this.state.selectedFile,
    //    tableHeaders: this.availableHeaders(),
    //    assigned: {
    //      id: x,
    //      ...
    //    } 
    //  }

    this.config = {
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
  }
  
  parseComplete = (results, parser) => {
    if(results.errors.length > 0) {
      // error handling

    } else {
      // load start
      this.setState({tableHeaders: results.data[0], excludedHeaders: results.data[0].map(el => true)}, function(){
        this.setState({step: 2}, function() {
          // load end

        })
      })
    }
  }

  onChangeHandler = event => {
    console.log(event.target.files[0])
    this.setState({selectedFile: event.target.files[0]})
  }

  onChangeCheckbox = event => {
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
          case "name":
            targetFormInput = 1
          case "timestamp":
            targetFormInput = 2
          default:
            targetFormInput = 0
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

  syncAssHeadersState = () => {
    let currentAssHeaders = []
    for(let val in this.state.assigned) {
      let i = this.availableHeaders().indexOf(this.state.assigned[val])
      if(i > -1) currentAssHeaders.push(i)
    }

    this.setState({assignedHeaders: [...new Set(currentAssHeaders)]})
  }

  onChangeList = event => {
    let val = parseInt(event.target.value)
    if(val > -1) {
      debugger
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

  nextButtonHandler = event => {
    switch(this.state.step) {
      case 1:
        if(!this.state.selectedFile) {
          window.alert("Please select a file to move forward.")
        } else {
          // move forward
          Papa.parse(this.state.selectedFile, this.config)
          this.setState({step: 2})
        }
      case 2:
        this.setState({step: 3})
      case 3:
      default:
        console.log(this.state.step)
    }
  }

  renderPageTitle = () => {
    switch(this.state.step) {
      case 1:
        return "Upload Dataset"
      case 2:
        return "Adjust Settings"
      case 3:
        return "Confirm Upload"
      default:
        console.log(this.state.step)
    }
  }

  availableHeaders = () => {
    return this.state.tableHeaders.filter((el, idx) => {
      if(this.state.excludedHeaders[idx]) {
        return true
      }
      return false
    })
  }

  cancelUpload = event => {
    // cancel upload
    console.log('upload cancelled')
  }

  renderContent = () => {
    switch(this.state.step) {
      case 1:
        return <FileUpload onChangeHandler={this.onChangeHandler} />
      case 2:
        return <AdjustSettings availableHeaders={this.availableHeaders()} tableHeaders={this.state.tableHeaders} onChangeCheckbox={this.onChangeCheckbox} onChangeList={this.onChangeList} />
      case 3:
        return <ConfirmUpload selectedHeaders={this.availableHeaders()} assignedInfo={this.state.assigned} />
      default: 
        return <FileUpload onChangeHandler={this.onChangeHandler} />
    }
  }

  stepToProgress = () => {
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

  nextButtonEnabled = () => {
    switch(this.state.step) {
      case 1:
        if(this.state.selectedFile) return true
      case 2:
        if(this.state.assigned.id && this.state.assigned.name && this.state.assigned.timestamp && this.state.excludedHeaders.includes(true)) return true
      case 3:
        if(this.state.assigned.id && this.state.assigned.name && this.state.assigned.timestamp && this.state.excludedHeaders.includes(true)) return true
      default:
        return false
    }
  }


  render() {
    return(
      <Card className="main-container">
        <Card.Header as="div">
          <Row>
            <Col lg={3}>
              <h5>{this.renderPageTitle()}</h5>
            </Col>
            <Col>
              <ProgressBar percent={this.stepToProgress()}>
                <Step>
                  {({ accomplished, index }) => (
                    <div
                      className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                      {index + 1}
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div
                      className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                      {index + 1}
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <>
                    <div
                      className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                      {index + 1}
                    </div>
                    </>
                  )}
                </Step>
              </ProgressBar>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text> */}
          {this.renderContent()}
        </Card.Body>
        <Card.Footer>
          {this.state.step > 1 ? <Button className="cancel-button" variant="secondary" onClick={this.cancelUpload}>Cancel</Button> : null}
          <Button className="move-forward-button" variant="primary" onClick={this.nextButtonHandler} disabled={!this.nextButtonEnabled()}>{this.state.step === 3 ? "Upload" : "Next"}</Button>
        </Card.Footer>
      </Card>
    )
  }
}

export default App;
