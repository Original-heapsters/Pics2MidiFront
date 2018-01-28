import React from 'react';
import domtoimage from 'dom-to-image';
import lottie from 'lottie-web';
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
    this.uploadingAnim = lottie.loadAnimation({
      container: this.refs.uploadButton, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'uploadButton.json' // the path to the animation json
    });
    this.uploadingAnim.addEventListener('complete', this.handleanimationComplete)
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  componentDidUpdate() {
  }

  handleanimationComplete = (event) => {
    this.uploadingAnim.stop();
  }

  uploadDrawing() {
    this.uploadingAnim.play();

    var node = this.refs.drawArea;


    domtoimage.toBlob(node)
      .then(function(blob) {
        var file = new File([blob], "drawing.png")
        var formData = new FormData();
        formData.append('photo', file);
        fetch('http://localhost:4000/upload_file', {
          method: 'POST',
          body: formData
        });
      });
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
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
      <div className="drawContainer">
        <div className = "drawArea"
            ref = "drawArea"
            onMouseDown = {this.handleMouseDown}
            onMouseMove = {this.handleMouseMove} >
          <Drawing lines = {this.state.lines}/>
        </div>
        <div className="fancyButton" ref="uploadButton" onClick={this.uploadDrawing} > </div>
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
