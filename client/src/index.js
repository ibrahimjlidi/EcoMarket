import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Add this line to import the CSS file
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
