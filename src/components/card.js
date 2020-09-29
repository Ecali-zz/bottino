import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class CardIn extends Component{
    constructor(props){
        super(props);
        this.thereAreDesc = this.thereAreDesc.bind(this);
    }
    thereAreDesc(){
        if(this.props.description != null){
            return (
                ` Currency in ${this.props.description}` 
            );
        }
    }
    render(){
        return(
            <Card>
                <Card.Header>{this.props.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {this.props.text}
                        <br />
                        {this.props.text2}
                    </p>
                    <footer className="blockquote-footer">
                        {this.thereAreDesc()}
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }

}
export default CardIn;