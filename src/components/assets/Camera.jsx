import React, { Component } from 'react';
import Camera from 'react-camera';
import axios from 'axios';

class CameraView extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    
    this.camera.capture()
    .then(blob => {
      var data = new FormData();
      data.set('file', blob, "test_image1.png");
      axios.post('/upload',data,{headers: {'Content-Type': "multipart/form-data"}})
      .then(function (response) {
      console.log(response);})
      .catch(function (response) {
      console.log(response);});
      // .then(res => {
      //   console.log(res);
      //   console.log(res.data);
      // })
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <Camera
            style={style.preview}
            ref={(cam) => {
              this.camera = cam;
            }}
          >
            <div style={style.captureContainer} onClick={this.takePicture}>
              <div style={style.captureButton} />
            </div>
          </Camera>
        </div>
      </div>
    );
  }
}
const style = {
  preview: {
    position: 'relative',
    width: "100%"
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    margin: 'auto',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};
export default CameraView;
