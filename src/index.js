import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import {Computer} from './Computer';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.css';


var PLAYERS = {
  you: {score: 0, symbol: "X", start: true, count:0},
  computer: {score: 0, symbol: "O", start: false, count:0},
};
var MOVES = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
//var COMPUTER = new Computer("hello");
//var COMPUTER = Computer();


ReactDOM.render(
  <App player={PLAYERS} move={MOVES}/>,
  document.getElementById('root')
);
