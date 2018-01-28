import React from 'react';
import domtoimage from 'dom-to-image';
import ImageUpload from './ImageUpload';
import ThreeVisual from './threeVisual';
import DrawArea from './DrawArea';
import GenerateArea from './generateArea';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      isHidden: false,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    return (
      <div>
      <div className="flex" >
        {!this.state.isHidden && <ImageUpload />}
        {!this.state.isHidden && <GenerateArea />}
        {!this.state.isHidden && <DrawArea />}
      </div>
      <ThreeVisual />
      </div>

    );
  }
}

export default Home;
