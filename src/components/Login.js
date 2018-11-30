import React, { Component } from 'react';
import logo from './../star_wars_logo.png';
import loader from './../loader.gif';

import './../App.css';
import Modal from './../Modal.js'

class Login extends Component {

  state = {
    username : "",
    password : "",
    showModal : false,
    errorMessage : "",
    loading : false
  }

  render() {
    return (
      <div className="App">
        <Modal show = {this.state.showModal} children = {this.state.errorMessage} handleClose = {() => this.setState({showModal : false})} ></Modal>
        <div className={this.state.loading ? "modal display-block" : "modal display-none"}>
				    <img src={loader} className="loader" alt="loader" />
			  </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to The Resistance</h1>
          <p>Enter Username and Password to login</p>
          <input className='input-text' type='text' onChange={event => this.setState({username : event.target.value})} placeholder='User Name'></input>
          <input className='input-text' type='password' onChange={event => this.setState({password : event.target.value})} placeholder='Password'></input>
          <button className='button-normal' disabled={!(this.state.password && this.state.username)} onClick={this.onLogin}>Login</button>
        </header>
      </div>
    );
  }

  onLogin = () => {
        this.setState({loading : true})
        fetch("https://swapi.co/api/people/?search=" + this.state.username)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json()
        })
        .then(data => this.validateLogin(data.results))
        .catch(error => {
          this.setState({
            errorMessage : "Something went wrong. Please try again.",
            showModal : true,
            loading : false
          })
        })
  }

  validateLogin = (users) => {
    var searchedUser = users.length === 1 ? users[0] : null
    if (searchedUser && searchedUser.name === this.state.username && searchedUser.birth_year === this.state.password) {
      localStorage.setItem('user', JSON.stringify(searchedUser));
      this.moveToHomeSceen()
      return
    }
    this.setState({
      errorMessage : "Invalid Username or Password",
      showModal : true,
      loading: false
    })
  }

  moveToHomeSceen = () => {
    this.props.history.push("/")
  }

}

export default Login;
