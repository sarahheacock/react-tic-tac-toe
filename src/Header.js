import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';

function Header(props){
  return (
    <div>
      <h1>tic-tac-toe</h1>
      <button onClick={props.reset} className="reset">Reset</button>

      <table className="text-center">
        <tbody>
          <tr>
            <th className="text-center" id="Human">You <br />{props.players.you.symbol}</th>
            <th className="text-center" id="Computer">Computer <br />{props.players.computer.symbol}</th>
          </tr>
          <tr>
            <td className="text-center" id="h_score">{props.players.you.score}</td>
            <td className="text-center" id="c_score">{props.players.computer.score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Header.propTypes = {
  players: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired
};




export default Header;
