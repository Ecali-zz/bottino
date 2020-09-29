import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Stock from './components/stock';

class App extends Component {
  constructor(){
    super();
    this.setData = this.setData.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.setData();
    this.getData();
  }
  setData =() =>{
    let userdata = {
      currencyBalance : 35,
      btcBalance : 0.00035
    }
    localStorage.setItem('userData', JSON.stringify(userdata));
  }
  getData = () =>{
    let data = localStorage.getItem('userData');
    data = JSON.parse(data);
    console.log(data.btcBalance);
  }
  render(){
    return (
      <div className="App">
        <Stock />
      </div>
    );
  }
}

export default App;
