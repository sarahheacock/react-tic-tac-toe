import React,{Component} from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import $ from 'jquery';
import './index.css';
import Modal from './Modal';
import Header from './Header';
import PropTypes from 'prop-types';
//import FaHeart from 'react-icons/fa/heart';
var FaHeart = require('react-icons/lib/fa/heart');
var FaCoffee = require('react-icons/lib/fa/coffee');

var winners = [[[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]],
[[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]],
[[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]];
var MOVES = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
//var computer = new Computer();
const COMPUTER = {
  find_move: function(go, symbol){
    var next;

    for (var i = 0; i < winners.length; i++){
      var check = 0;
      var empty = 0;

      for (var j = 0; j < winners[i].length; j++){
        if(go[winners[i][j][0]][winners[i][j][1]] === symbol){
          check++;
        }
        else if (go[winners[i][j][0]][winners[i][j][1]] === "_"){
          next = winners[i][j];
          empty++;
        }
        if(check === 2 && empty === 1) {
          return next;
        }
      }
    }

    return undefined;
  },

  random_move: function(moves){
    var random_row = Math.round(Math.random()*2);
    var random_column = Math.round(Math.random()*2);
    while (moves[random_row][random_column] !== "_"){
      random_row = Math.round(Math.random()*2);
      random_column = Math.round(Math.random()*2);
    }
    return [random_row, random_column];
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.player,
      moves: this.props.move,
    };
  }


  update_letters(letter) {
    this.state.players.you.symbol = letter;
    if(letter === "X"){
      this.state.players.computer.symbol = "O";
    }
    else {
      this.state.players.computer.symbol = "X";
    }
    this.setState(this.state);
  }

  player_go(r_index, s_index) {

    if(this.state.players.you.start === true && this.state.moves[r_index][s_index] === "_"){
      this.state.players.you.start = false;
      this.state.players.you.count++;
      this.state.moves[r_index].splice(s_index, 1, this.state.players.you.symbol);

      var id = 3 * r_index + s_index;
      this.setState(this.state, () => {
        this.check_win(this.state.players.you, id);
      });
    }
  }

  computer_go() {
    if(this.state.players.computer.start = true){
      //var computer = this.state.player.computer;
      var select = COMPUTER.find_move(this.state.moves, this.state.players.computer.symbol);
      if(select === undefined){
        var block = COMPUTER.find_move(this.state.moves, this.state.players.you.symbol);
        if(block === undefined){
          select = COMPUTER.random_move(this.state.moves);
        }
        else {
          select = block;
        }
      }
      this.state.players.computer.start = false;
      this.state.players.computer.count++;
      this.state.moves[select[0]].splice(select[1], 1, this.state.players.computer.symbol);
      var id = 3 * select[0] + select[1];
      this.setState(this.state, () => {this.check_win(this.state.players.computer, id);});
    }
  }

  check_win(player, id) {
    $("#" + id).animate({ opacity: 1 }, 700, () => {
      var win = false;
      var go = this.state.moves;
        for (var i = 0; i < winners.length; i++) {
            for (var j = 0; j < winners[i].length; j++) {
                if (go[winners[i][j][0]][winners[i][j][1]] !== player.symbol) break;
                else if (j === 2 && go[winners[i][j][0]][winners[i][j][1]] === player.symbol) win = true;
            }
        }

        if (win === false) this.check_cats(player.symbol);
        else this.game_over(player.symbol);
    });
  }

  check_cats(symbol) {
      var cats = true;
      var check = this.state.moves;
      for (var i = 0; i < check.length; i++) {
          for (var j = 0; j < check[i].length; j++) {
              if (check[i][j] === "_") cats = false;
          }
      }

      if (cats === false) {
          if (symbol === this.state.players.you.symbol) {
              this.state.players.computer.start = true;
              this.setState(this.state, () => {this.computer_go()});
          } else if(symbol === this.state.players.computer.symbol){
              this.state.players.you.start = true;
              this.setState(this.state);
          }
      }
      else if (cats === true) {
          console.log("cats");
          return this.game_over("cats");
      }
  }

  game_over(status){
    //change moves
    console.log("game_over");
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        var id = 3 * i + j;
        $("#" + id).animate({ opacity: 0}, 100);
      }
    }

    this.state.moves = MOVES;
    //add point
    if(status === this.state.players.computer.symbol){
      this.state.players.computer.score++;
      this.state.players.you.start = true;
      this.setState(this.state);
    }
    else if(status === this.state.players.you.symbol){
      this.state.players.you.score++;
      this.state.players.computer.start = true;
      this.setState(this.state, () => {this.computer_go()});
    }
    else if(status === "cats"){
      if(this.state.players.computer.count > this.state.players.you.count){
        this.state.players.you.start = true;
        this.setState(this.state);
      }
      else{
        this.state.players.computer.start = true;
        this.setState(this.state, () => {this.computer_go()});
      }
    }

  }

  reset(){

    this.state.players.you.score = 0;
    this.state.players.computer.score = 0;
    this.setState(this.state, () => {this.game_over("cats");})
  }


  render() {
    console.log(this.state.moves);
    const squares = this.state.moves.map(function(row, row_index){
      var new_row = row.map(function(square, square_index){
        var ID = 3 * row_index + square_index
        return(
          <button className="board" key={[row_index, square_index]} onClick={() => this.player_go(row_index, square_index)}>
          <span id={ID}>{square}</span>
          </button>
        );
      }.bind(this))
      return <div key={row_index}>{new_row}</div>;
    }.bind(this));


    return (
    <div className="container-fluid ">
    <div className="main text-center">
      <Modal choose={(symbol) => this.update_letters(symbol)}/>
      <Header players={this.state.players}  reset={() => this.reset()}/>
      {squares}
    </div>
    <footer className="text-center">This page was built with <FaHeart /> and <FaCoffee /> <br /> by Sarah Heacock.</footer>
    </div>
    );
  }
}

Modal.propTypes = {
    players: PropTypes.object,
    moves: PropTypes.array,
};



export default App;
