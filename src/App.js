import React from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { ProgressBar, Step } from 'react-step-progress-bar';
import FileUpload from './sub-components/FileUpload.js';
import AdjustSettings from './sub-components/AdjustSettings.js';
import ConfirmUpload from './sub-components/ConfirmUpload.js';
import Papa from 'papaparse';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 1,
      selectedFile: null,
      tableHeaders: []
    }

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
      this.setState({tableHeaders: results.data}, function(){
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
      case 3:
      default:
        console.log(this.state.step)
    }
  }

  renderContent = () => {
    switch(this.state.step) {
      case 1:
        return <FileUpload onChangeHandler={this.onChangeHandler} />
      case 2:
        return <AdjustSettings tableHeaders={this.state.tableHeaders} />
      case 3:
        return <ConfirmUpload />
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


  render() {
    return(
      <Card className="main-container">
        <Card.Header as="div">
          <Row>
            <Col>
              <h5>Upload Dataset</h5>
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
                    <div
                      className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                      {index + 1}
                    </div>
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
          <Button className="move-forward-button" variant="primary" onClick={this.nextButtonHandler}>Next</Button>
        </Card.Footer>
      </Card>
    )
  }
}

export default App;
