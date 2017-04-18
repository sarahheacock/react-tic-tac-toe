import React, {Component} from 'react';
import $ from 'jquery';
import './index.css';
import PropTypes from 'prop-types';

class Modal extends Component{
  componentDidMount(){
    $(".modal").css('display', 'block');
  }

  disappear(){
    //$(".modal").css('display', 'none');
    $(".modal").animate({height: 0, opacity: 0}, 500);
  }

  render(){
    return(
      <div id="myModal" className="modal">
        <div className="modal-content">
          <h2>Choose a Team</h2>
          <div>
            <button onClick={function() {this.props.choose("X"); this.disappear();}.bind(this)}>X</button>
            <button onClick={function() {this.props.choose("O"); this.disappear();}.bind(this)}>O</button>
          </div>
        </div>
      </div>
    );
  }
}


Modal.propTypes = {choose: PropTypes.func.isRequired};

export default Modal;
