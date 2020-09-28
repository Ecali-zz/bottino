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
                        {' '}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.{' '}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        );
    }

}
export default CardIn;