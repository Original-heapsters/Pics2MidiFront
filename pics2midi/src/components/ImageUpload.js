import React from 'react';
import lottie from 'lottie-web';
import '../index.css';
class ImageUpload extends React.Component {
  constructor() {
    super();
    var switchingAnim;
    var uploadingAnim;
    this.state = {
      file: '',
      imagePreviewUrl: '',
      loadingOpacity: 0,
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
    this.refs.lottie.style.visibility = "hidden";
    this.switchingAnim.addEventListener("complete", this.handleSwitchComplete);
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    this.uploadingAnim = lottie.loadAnimation({
      container: this.refs.uploadButton, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'uploadButton.json' // the path to the animation json
    });
    this.uploadingAnim.addEventListener('complete', this.handleanimationComplete)
  }

  handleImageChange(e) {
    e.preventDefault();
    this.refs.lottie.style.visibility = "visible";
    this.switchingAnim.play()

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  uploadImage() {
    this.uploadingAnim.play();
    this.uploadImage.onComplete = function(){
      alert("animation done");
      console.log("animation is done");
    }

    var formData = new FormData();
      formData.append('photo', this.state.file);
      fetch('http://localhost:5000/upload_file', {
        method:'POST',
         body: formData
      });
  }

  handleanimationComplete = (event) => {
    this.uploadingAnim.stop();
  }
  handleSwitchComplete = (event) => {
    console.log("switch complete");
    this.switchingAnim.stop();
    this.refs.lottie.style.visibility = "hidden";
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $containsImage = false;
    let $uploadDiv = (<div  ref="uploadButton" className="fancyButton" onClick={this.uploadImage}></div>);
    if (this.refs.uploadButton) {
      this.uploadingAnim.destroy();
    }
    if (imagePreviewUrl) {
      $containsImage = true;
      $imagePreview = (
        <div className="drawing">
          <img src={imagePreviewUrl} />
        </div>);
    }
    else {
      $containsImage = false;
      $imagePreview = (<div className="drawing"></div>);
    }
    return (
        <div className="uploadingWindow">
          {$imagePreview}
          { $containsImage && $uploadDiv}
          <input type="file" name="file" id="file" className="inputfile" onChange={this.handleImageChange}/>
          <label htmlFor="file">
            <div className="switchingLoader" ref="lottie"></div>
            Choose a file
          </label>
        </div>
    );
  }
}

export default ImageUpload;
