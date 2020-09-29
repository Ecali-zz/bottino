import React, { Component } from 'react'
import CardIn from './card';
import BuySell from './formBuySell';
import {Container, Row, Col} from 'react-bootstrap';
import firebase from '../util/fire';
class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPrice : '',
            currentPriceFloat : 0,
            descriptionPrice: '',
            codePrice: '',
            balance : '',
            bitcoinBalance : ''
        }
        this.btcCode = 'BTC'
        this.titleBit = 'VALORE ATTUALE DEI BITCOIN';
        this.titleBalance = 'IL TUO BILANCIO';
        this.titleOrder = 'PLACE ORDER';

        this.text = '';
        
        this.database = {
            btc: '',
            currency : ''
        }
    }
    componentDidMount(){
        this.getData();
        this.fetchBTC();
    }
    getData = () =>{
        this.database.btc = firebase.database().ref('balance').child('btc');
        this.database.currency = firebase.database().ref('balance').child('currency');

        this.database.btc.on('value', snap =>{
            this.setState({
                bitcoinBalance: (snap.val()).toFixed(6)
            });
        })
        this.database.currency.on('value', snap =>{
            this.setState({
                balance: snap.val()
            });
         })
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
                firebase.database().ref('balance').child('current').set(this.state.currentPriceFloat);
                console.log('rate : '+ this.state.currentPriceFloat);
                let localdata = localStorage.getItem('userData');
                localdata = JSON.parse(localdata);
                localdata.currentbtc = this.state.currentPriceFloat;
                localStorage.setItem('userData', JSON.stringify(localdata));
                console.log(localdata);
            })
            .catch(console.log)

    }
    render() {
        this.text = this.state.currentPrice +' '+ this.state.codePrice;
        //this.bitcoinBalance = this.howManyBTC();
        return (
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
                            text = {this.state.balance + ' '+ this.state.codePrice}
                            text2 = {this.state.bitcoinBalance + ' '+ this.btcCode}
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
            
        )
    }
}


export default Stock;
