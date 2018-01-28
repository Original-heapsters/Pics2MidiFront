import React from 'react';
import ReactDOM from 'react-dom';
import bodymovin from 'bodymovin';
import lottie from 'lottie-web';
import '../index.css';
class ImageUpload extends React.Component {
  constructor() {
    super();
    var switchingAnim;
    var uploadingAnim;
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    this.switchingAnim = lottie.loadAnimation({
      container: this.refs.lottie, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'loading.json' // the path to the animation json
    });

    this.uploadingAnim = lottie.loadAnimation({
      container: this.refs.uploadButton, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'uploadButton.json' // the path to the animation json
    });
  }

  componentWillUnmount() {
  }

  handleImageChange(e) {
    e.preventDefault();
    this.switchingAnim.play();

          let reader = new FileReader();
          let file = e.target.files[0];
    this.switchingAnim.onComplete = function(){
      this.stop()
    }



      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }

      reader.readAsDataURL(file)
    // }
    }

  uploadImage() {
    this.uploadingAnim.stop();
    this.uploadingAnim.play();
    this.uploadingAnim.onComplete = function(){
      this.goToAndStop(0,true);
    // var formData = new FormData();
    //   formData.append('photo', this.state.file);
    //   fetch('http://localhost:5000/upload_file', {
    //     method:'POST',
    //      body: formData
    //   });
    }

  }
  // <input type="file" onChange={this.handleImageChange} />
  // {$imagePreview}
  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }
    return (
      <div>
        <div className="uploadingWindow">
          <div  ref="uploadButton" className="fancyButton" onClick={this.uploadImage}></div>
        </div>
      </div>

    );
  }
}

export default ImageUpload;
