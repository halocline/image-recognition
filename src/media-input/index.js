import React from 'react'
import axios from 'axios'
// Detect-API settings
const apiConfig = require('../config/').detectApi

const apiEndpoint = apiConfig.url + '/upload'

class MediaInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
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
      console.log(res.statusText);
      console.log(res);
      console.log(res.data.file);
      this.props.imageUploadCallback(res.data.file)
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
        </div>
      </div>
    )
  }
}

export default MediaInput;
