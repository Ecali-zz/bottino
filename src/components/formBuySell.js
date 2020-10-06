import React, { Component } from 'react';
import {Form, FormControl, Row, Col, Button} from 'react-bootstrap';
import firebase from '../util/fire';

class BuySell extends Component{
    constructor(props){
        super(props);
        this.state = {
            currencyBalance : this.props.currencyBalance,
            btcBalance : this.props.btcBalance,
            currentV : '',
            importToSell : 0,
            importToBuy : 0,
            buy : 'BUY BTC',
            sell : 'SELL EUR',
            valueBuy : '',
            valueSell : '',
            buttonControl : '',
            buttonState : 'disable'
        }
        this.handleChange = this.handleChange.bind(this);
        this.getbalance();
    }
    getbalance = () =>{
        let data = localStorage.getItem('userData');
        data = JSON.parse(data);

        this.state.btcBalance  = data.btcBalance;
        this.state.currencyBalance = data.currencyBalance;
    }
    handleChange(e) {
        if(e.target.id === 'buy'){
            this.setState({ valueBuy: e.target.value });
        }else{
            this.setState({ valueSell: e.target.value });
        }
      }
    ammountToUse(str){
        if(str === this.state.sell){
            if(this.state.importToSell === 0){
                return str;
            }
            return str + ' ' + this.state.importToSell;
        }
        if(this.state.importToBuy === 0){
            return str;
        }
        return str + ' ' + this.state.importToBuy;
    }
    getcurrencyvalue = () => {
        var localdata = firebase.database().ref('balance').child('current');
        localdata.on('value', snap =>{
            this.setState({
                currentV : (snap.val()).toFixed(8)
            })
            return true;
        })

    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.getcurrencyvalue())
            this.setState({
                buttonState : ''
            })
        if(this.state.currentV > 0){
            if(this.state.buttonControl === this.state.buy ){
                var currencyBalance = this.state.currencyBalance - this.state.valueBuy;
                var buyitat = this.state.valueBuy/this.state.currentV;
                var btcBalance = this.state.btcBalance + buyitat;
                this.setState({
                    currencyBalance : currencyBalance,
                    btcBalance : btcBalance
                });

                firebase.database().ref('balance').child('currency').set(currencyBalance);
                firebase.database().ref('balance').child('btc').set(btcBalance);
            }else{

                var buyit = this.state.btcBalance - this.state.valueSell;
                var eurplus = this.state.valueSell * this.state.currentV;
                var eurt = this.state.currencyBalance + eurplus;
                this.setState({
                    currencyBalance : eurt,
                    btcBalance : buyit
                })
                firebase.database().ref('balance').child('currency').set(this.state.currencyBalance);
                firebase.database().ref('balance').child('btc').set(this.state.buyit);

            }
        }else{
            this.getcurrencyvalue();

        }
        
      }
    render(){
        return(
            <Form className='buyorsell' onSubmit={this.mySubmitHandler}>
                <Row className='buyorsell__row'>
                <Col className='buyorsell__col'>
                    <h5>{this.state.buy}</h5>
                    <FormControl
                        id='buy'
                        type='number'
                        min={0}
                        max={this.state.currencyBalance}
                        value ={this.state.valueBuy} 
                        placeholder="Import to buy" 
                        onChange={this.handleChange}
                        />
                    <Button 
                    type='submit'
                    className='buyorsell__bott'
                    variant='success'
                    {... this.state.buttonState}
                    onClick={() => {
                        this.setState({ buttonControl: this.state.buy });
                      }}
                    >
                    {this.ammountToUse(this.state.buy)}
                    </Button>
                </Col>
                <Col className='buyorsell__col'>
                    <h5>{this.state.sell}</h5>
                    <FormControl 
                    type='number'
                    min={0}
                    max={this.state.btcBalance}
                    value ={this.state.valueSell} 
                    placeholder="Import to sell" 
                    onChange={this.handleChange}
                    />
                    <Button 
                    type='submit'
                    className='buyorsell__bott'
                    variant='danger'
                    {... this.state.buttonState}
                    onClick={() => {
                        this.setState({ buttonControl: this.state.sell });
                      }}
                    >
                    {this.ammountToUse(this.state.sell)}
                    </Button>
                </Col>
                </Row>
            </Form> 
        );
    }

}
export default BuySell;