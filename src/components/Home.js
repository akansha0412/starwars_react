import React, { Component } from 'react';
import List from './List.js'
import loader from './../loader.gif';
import Modal from './../Modal.js'

class Home extends Component {

  state = {
    planets: [],
    items: [],
    showModal : false,
    showInfoModal : false,
    errorMessage : "",
    loading : false,
    selectedPlanet : {},
    nextPage : null,
    searchText: ""
  }

render() {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
    <Modal show = {this.state.showModal} children = {this.state.errorMessage} handleClose = {() => this.setState({showModal : false})} ></Modal>
    <InfoModal show = {this.state.showInfoModal} children = {this.state.selectedPlanet} handleClose = {() => this.setState({showInfoModal : false})} ></InfoModal>
    <div className={this.state.loading ? "modal display-block" : "modal display-none"}>
        <img src={loader} className="loader" alt="loader" />
    </div>
        <h3 style={{color:'#ffcc00', margin:'10px', width:'100%', height:'auto'}}>
          Welcome, {user.name}
          <button style={{width:'auto', position:'absolute', right:'0'}} className="button-normal" onClick={this.onLogout} >Logout</button>
        </h3>
          <form>
              <input style={{padding:'5px', marginLeft:'40px'}} type="text" className="input-search" placeholder="Search planets" onChange={(event) =>this.filterList(event.target.value)}/>
          </form>
          <List items={this.state.items} onItemClick={this.onListItemClicked}/>
          <button style={{width:'auto', marginLeft:'40px'}} disabled={!this.state.nextPage} className="button-normal" onClick={this.loadNextPage} >Load More</button>
        </div>
    </div>
  );
}

  componentDidMount() {
    this.setState({loading : true})
    fetch("https://swapi.co/api/planets/")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(data => {
        this.populateList(data.results)
        this.setState({
          nextPage: data.next
        })
      })
      .then(() => this.setState({loading : false}))
      .catch(error => {
        this.setState({
          errorMessage: "Something went wrong. Please try again.",
          showModal: true,
          loading: false
        })
      })
  }

  onListItemClicked = (selectedPlanet) => {
    this.setState({
      selectedPlanet: selectedPlanet,
      showInfoModal: true,
    })
  }

  populateList = (planets) => {
    this.setState({
      planets: planets,
      items : planets
    })
  }

  filterList = (value) => {
    var updatedList = this.state.planets;
    updatedList = updatedList.filter(function(item) {
      return item.name.toLowerCase().search(
        value.toLowerCase()) !== -1;
    });
    this.setState({
      items: updatedList,
      searchText: value
    });
  }

  loadNextPage = () => {
    if (!this.state.nextPage) {
      return
    }
    this.setState({loading : true})
    fetch(this.state.nextPage)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(data => {
        this.setState({
          planets: this.state.planets.concat(data.results),
          nextPage: data.next
        })
        this.filterList(this.state.searchText)
      })
      .then(() => this.setState({loading : false}))
      .catch(error => {
        this.setState({
          errorMessage: "Something went wrong. Please try again.",
          showModal: true,
          loading: false
        })
      })
  }

  onLogout = () => {
    localStorage.removeItem('user');
    this.props.history.push("/login")
  }

}

const InfoModal = (props) => {
    return (
      <div className={props.show ? "modal display-block" : "modal display-none"}>
        <div className="modal-main App">
          <p style={{fontSize:'12px'}}>Welcome to planet <b>{props.children.name}</b></p>
          <p style={{fontSize:'12px'}}>It has a population of <b>{props.children.population}</b>.</p>
          <p style={{fontSize:'12px'}}>With Rotation period of <b>{props.children.rotation_period} days</b> &amp; Orbital period of <b>{props.children.orbital_period} days</b></p>
          <button className="button-normal" onClick={props.handleClose}>Close</button>
        </div>

      </div>
  );
}


export default Home;
