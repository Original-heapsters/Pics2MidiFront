import React from 'react';
import ReactDOM from 'react-dom';
import bodymovin from 'bodymovin';
import lottie from 'lottie-web';
import '../index.css';
class GenerateArea extends React.Component {
  constructor() {
    super();
    var generatingAnim;

    this.handleGenerating = this.handleGenerating.bind(this);
  }

  componentDidMount() {
    this.generatingAnim = lottie.loadAnimation({
      container: this.refs.generateButton, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'generatingMidi.json' // the path to the animation json
    });
  }

  componentWillUnmount() {
  }

  handleGenerating(e) {
      e.preventDefault();
      this.generatingAnim.play();
      this.generatingAnim.onComplete = function(){
        this.stop()
      }
    }

  render() {
    return (
      <div className="generateArea">
      <div className="bigBoi" ref="generateButton"></div>
        <button onClick={this.handleGenerating}> cool </button>
      </div>

    );
  }
}

export default GenerateArea;
