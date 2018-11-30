import React, { Component } from 'react';
import './App.css';


class Modal extends Component {

  render() {
    return (
      <div className={this.props.show ? "modal display-block" : "modal display-none"}>
        <div className="modal-main">
          <p>{this.props.children}</p>
          <button className="button-normal" onClick={this.props.handleClose}>Close</button>
        </div>

      </div>
    );
  }

}
export default Modal;
