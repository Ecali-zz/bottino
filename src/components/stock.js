import React, { Component } from 'react'
import CardIn from './card';
class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPrice : '',
            currentPriceFloat : 0,
            descriptionPrice: '',
            codePrice: ''
        }
        this.title = 'VALORE ATTUALE DEI BITCOIN';
    }
    componentDidMount(){
        this.fetchBTC();
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
        return (
            <div>
                <CardIn
                    title = {this.title}
                    currentPrice = {this.state.currentPrice}
                    codePrice = {this.state.codePrice}
                    description = {this.state.descriptionPrice}
                />
            </div>
        )
    }
}


export default Stock;
