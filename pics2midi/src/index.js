import React from 'react';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import ImageUpload from './components/ImageUpload';
import DrawArea from './components/DrawArea';
import ThreeVisual from './components/threeVisual';
import GenerateArea from './components/generateArea';
import './index.css';

// <ThreeVisual />
ReactDOM.render(
  <div className="flex">
    <ImageUpload />
    <GenerateArea />
    <DrawArea />
  </div>,
  document.getElementById("container")
);
