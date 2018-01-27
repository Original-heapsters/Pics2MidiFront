import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
class ImageUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  handleImageChange(e) {
      e.preventDefault();

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
    var formData = new FormData();
      formData.append('photo', this.state.file);
      fetch('http://localhost:5000/upload_file', {
        method:'POST',
         body: formData
      });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div className="square"><img src={imagePreviewUrl} /></div>);
    }
    return (
      <div className="uploadingWindow">
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleImageChange} />
          <button onClick={this.uploadImage}>Upload Image</button>
        </form>
        {$imagePreview}
      </div>
    );
  }
}

export default ImageUpload;
