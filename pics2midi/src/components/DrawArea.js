import React from 'react';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import domtoimage from 'dom-to-image';
import {
  List,
  Map
} from 'immutable';
import '../index.css';
class DrawArea extends React.Component {
  constructor() {
    super();

    this.state = {
      lines: new List(),
      isDrawing: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.uploadDrawing = this.uploadDrawing.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  uploadDrawing() {
    console.log(this.state.lines);
    var node = this.refs.drawArea;
    var options = {
        quality: 0.95
    };

    // domtoimage.toJpeg(node, options).then(function (dataUrl) {
    //
    // //   const toFile = require('data-uri-to-file');
    // //   const dataUri = dataUrl
    // //
    // //   // promise style
    // //   toFile(dataUri).then(file => {
    // //
    // //         file.name = "drawing.jpg"
    // //         alert(file.name);
    // //         var formData = new FormData();
    // //         formData.append('photo', file);
    // //         fetch('http://localhost:5000/upload_file', {
    // //           method: 'POST',
    // //           body: formData
    // //         });
    // //   });
    // //   // var file = new File([dataUrl], "drawing.jpg")
    // //
    // // });
    domtoimage.toBlob(node)
      .then(function(blob) {
        var file = new File([blob], "drawing.png")
        var formData = new FormData();
        formData.append('photo', file);
        fetch('http://localhost:5000/upload_file', {
          method: 'POST',
          body: formData
        });
      });
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
      type: mimeString
    });
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button != 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new List([point])),
      isDrawing: true
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleMouseUp() {
    this.setState({
      isDrawing: false
    });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

  render() {
    return (
      <div>
        <div className = "drawArea"
            ref = "drawArea"
            onMouseDown = {this.handleMouseDown}
            onMouseMove = {this.handleMouseMove} >
          <Drawing lines = {this.state.lines}/>
        </div>
        <div>
          <button onClick = {this.uploadDrawing} >
            Upload your masterpiece
          </button>
        </div>
      </div>
    );
  }
}

function Drawing({ lines }) {
  return ( <svg className = "drawing" > {
      lines.map((line, index) => ( <DrawingLine key = {index} line = {line} />))
    } </svg>
  );
}

function DrawingLine({ line }) {
  const pathData = "M " +
    line
    .map(p => {
      return `${p.get('x')} ${p.get('y')}`;
    })
    .join(" L ");

  return <path className = "path" d = { pathData } />;
}

export default DrawArea;
