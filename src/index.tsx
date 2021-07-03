import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { util } from 'utils'
import 'normalize.css/normalize.css';

util.injectScript('http://192.168.1.21:5000/ffmpeg.min.js')
util.injectScript('http://192.168.1.21:5000/ffmpeg-core.js')
ReactDOM.render(<App/>, document.getElementById('root'));