import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class CardIn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Card>
                <Card.Header>{this.props.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {this.props.currentPrice} {this.props.codePrice}
                    </p>
                    <footer className="blockquote-footer">
                        Currency in  <cite title="Source Title">{this.props.description}</cite>
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }

}
export default CardIn;