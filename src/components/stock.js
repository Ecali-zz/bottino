import React, { Component } from 'react'
import CardIn from './card';
import BuySell from './formBuySell';
import {Container, Row, Col} from 'react-bootstrap';
import Store from '../js/Store';
class Stock extends Component {

    constructor(props){
        super(props);
        window.$balance = 34;
        this.state = {
            currentPrice : '',
            currentPriceFloat : 0,
            descriptionPrice: '',
            codePrice: '',
        }
        this.btcCode = 'BTC'
        this.titleBit = 'VALORE ATTUALE DEI BITCOIN';
        this.titleBalance = 'IL TUO BILANCIO';
        this.titleOrder = 'PLACE ORDER';

        this.text = '';
        this.balance = '';
        this.bitcoinBalance = '';
    }
    componentDidMount(){
        this.fetchBTC();
        this.getData();
    }
    getData = () =>{
        let data = localStorage.getItem('userData');
        data = JSON.parse(data);
        this.balance = data.currencyBalance;
        this.bitcoinBalance  = data.btcBalance;
        console.log('cb : ' + this.balance);
        console.log('bb : ' + this.bitcoinBalance);

    }
    
    howManyBTC(){
        return (this.balance / this.state.currentPriceFloat).toFixed(6);
    }
    fetchBTC(){
        const API_LINK = 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json';

        fetch(API_LINK)
            .then(res => res.json())
            .then(data => {
                let price = data.bpi.EUR;
                this.setState({
                    currentPrice : price.rate,
                    currentPriceFloat : price.rate_float,
                    descriptionPrice : price.description,
                    codePrice: price.code
                });
                console.log('rate : '+ this.state.currentPriceFloat);
                console.log(price);
            })
            .catch(console.log)

    }
    render() {
        this.text = this.state.currentPrice +' '+ this.state.codePrice;
        //this.bitcoinBalance = this.howManyBTC();
        return (
            <Store>
                <Container className='main-container'>
                    <Row>
                        <Col className='col-sm-8'>
                            <CardIn
                            title = {this.titleBit}
                            text = {this.text}
                            description = {this.state.descriptionPrice}
                            />
                        </Col>
                        <Col>
                            <CardIn
                            title = {this.titleBalance}
                            text = {this.balance + ' '+ this.state.codePrice}
                            text2 = {this.bitcoinBalance + ' '+ this.btcCode}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-sm-8' >

                        </Col>
                        <Col>
                            <CardIn 
                            title = {this.titleOrder}
                            text= {<BuySell
                                currencyBalance = {this.balance}
                                btcBalance = {this.bitcoinBalance}
                            />}
                            />
                        </Col>
                    </Row>
                </Container>
            </Store>
            
        )
    }
}


export default Stock;
