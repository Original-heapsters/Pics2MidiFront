import React from 'react';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import ImageUpload from './components/ImageUpload';
import DrawArea from './components/DrawArea';
import ThreeVisual from './components/threeVisual';
import './index.css';


ReactDOM.render(
  <div>
  <ImageUpload />
  <DrawArea />
  <ThreeVisual />
  </div>,
  document.getElementById("container")
);
