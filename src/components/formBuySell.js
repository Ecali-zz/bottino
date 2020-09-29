import React, { Component } from 'react';
import {Form, FormControl, Row, Col, Button} from 'react-bootstrap';
class BuySell extends Component{
    constructor(props){
        super(props);
        this.state = {
            currencyBalance : this.props.currencyBalance,
            btcBalance : this.props.btcBalance,
            importToSell : 0,
            importToBuy : 0,
            buy : 'BUY BTC',
            sell : 'SELL EUR',
            valueBuy : '',
            valueSell : '',
            buttonControl : ''
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
    mySubmitHandler = (event) => {
        event.preventDefault();
        var localdata = localStorage.getItem('userData');
        localdata = JSON.parse(localdata);
        if(this.state.buttonControl === this.state.buy ){
            var buyitat = this.state.valueBuy/localdata.currentbtc;
            console.log('gigi ' + (buyitat).toFixed(6));
            localdata.currencyBalance = localdata.currencyBalance - this.state.valueBuy;
            localdata.btcBalance = localdata.btcBalance + buyitat;
            localStorage.setItem('userData', JSON.stringify(localdata));
        }else{

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