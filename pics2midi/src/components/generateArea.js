import React from 'react';
import lottie from 'lottie-web';
import '../index.css';
class GenerateArea extends React.Component {
  constructor() {
    super();
    this.state = {
      style : "bigBoi",
    }
    var generatingAnim;

    this.handleGenerating = this.handleGenerating.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  handleGenerating(e) {
      e.preventDefault();
      this.setState({
        style: "bigBoi bigBoiScaledDown",
      });
      this.refs.generateIcon.style.display = "none";
      // this.setState({
      //   style: "bigBoi bigBoiScaledUp",
      // });
      this.generatingAnim = lottie.loadAnimation({
        container: this.refs.generateButton, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'generatingMidi.json' // the path to the animation json
      });
      this.generatingAnim.play();
      this.setState({
        style: "bigBoi bigBoiScaledUp",
      });
    }

  render() {
    return (
      <div className="generateArea">
        <button className={this.state.style} ref="generateButton" onClick={this.handleGenerating}>
          <img ref="generateIcon" src="genIcon.png" alt="my image" />
        </button>
      </div>

    );
  }
}

export default GenerateArea;
