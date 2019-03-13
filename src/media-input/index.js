import React from 'react'
import axios from 'axios'
import './media-input.css'
// Detect-API settings
const apiConfig = require('../config/').detectApi

const apiEndpoint = apiConfig.url + '/upload'

class MediaInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      uploaded: false,
      uploadedImage: null,
    }
  }

  handleSelectedFiles = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleFileUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios.post(apiEndpoint, data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      }
    })
    .then( res => {
      this.props.imageUploadCallback(res.data.file, this.state.selectedFile.name)
      this.setState({
        uploaded: true,
        uploadedImage: apiConfig.url + '/files/' + this.state.selectedFile.name
      })
    })
  }

  render() {
    return(
      <div className="MediaInput">
        <div>
          <h3>Media Input</h3>
        </div>
        <div>
          <div>
            <label htmlFor="imgfile">Select image file to process (.png, .jpg)</label>
            <input
              type="file"
              id="imgfile"
              name="imgfile"
              accept="image/png, image/jpeg"
              onChange={this.handleSelectedFiles}
            ></input>
          </div>
          <div>
            <button onClick={this.handleFileUpload}>Upload Selected Image</button>
            <div>{ Math.round(this.state.loaded, 2) } %</div>
          </div>
          <div>
            <img className="orig" src={this.state.uploadedImage} alt="To be analyzed" />
          </div>
        </div>
      </div>
    )
  }
}

export default MediaInput;
