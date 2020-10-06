import React, { Component } from 'react';
import { Container, Form, FormControl, Col, Button, Accordion, Card, InputGroup } from 'react-bootstrap';
import Tables from './table';
class LevelBuilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            imputOne : '',
            imputTwo : '',
            imputThree : '',
            perc1 : 0,
            perc2 : 0,
            perc3 : 0,
            perc4 : 0,
            perc5 : 0,
        }
        this.btcValue = 0;
        this.titles = [
            '% perc', 'Level Value'
        ]
        this.value = [
            ['50%', ''],
            ['60%', ''],
            ['70%', ''],
            ['80%', ''],
            ['90%', '']
        ]
        this.tempperc = [
            [50,'50%'],
            [60, '60%'],
            [70, '70%'],
            [80, '80%'],
            [90, '90%']
        ]
        this.cange = false;
        this.setbtcValue = this.setbtcValue.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
        if(e.target.name === 'perc1' || e.target.name === 'perc2' ||e.target.name === 'perc3' ||e.target.name === 'perc4' ||e.target.name === 'perc5' ){
            this.cange = true;
        }
     }
    getperc = (num) =>{
        if(num === 0){
            return this.state.perc1;
        }else if(num === 1){
            return this.state.perc2;
        }else if(num === 2){
            return this.state.perc3;
        }else if(num === 3){
            return this.state.perc4;
        }else if(num === 4){
            return this.state.perc5;
        }
    }
     calculateLevels = () =>{
        if(this.cange){
            for(let i = 0; i < 5; i++){
                if(this.getperc(i) > 0){
                    this.tempperc[i][0] = this.getperc(i);
                    this.tempperc[i][1] = this.getperc(i) + '%';
                    this.value[i][0] = this.getperc(i) + '%';
                }
            }       
        }         

        var one = this.state.imputOne;
        var two = this.state.imputTwo;
        var value;
        var first, second;
        
        if(this.state.imputThree){
            var three = this.state.imputThree;
        }
        if(two < one){
            first = two;
            second = one;
        }else{
            first = one;
            second = two;
        }
        for(var i = 0; i < 5; i++){
            var perc = this.tempperc[i][0]/100;
            value = parseFloat((first - second)*perc);
            value = Number(second) + Number(value);
            this.value[i][1] = value; 
        }
     }

     setbtcValue = () =>{
        const API_LINK = 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json';

        fetch(API_LINK)
            .then(res => res.json())
            .then(data => {
                let price = data.bpi.EUR;
                this.setState({
                    imputOne : price.rate_float
                });
            })
            .catch(console.log)
     }

    render(){
        return(
            <Container>
                <Form>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                        SET LEVELS
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <FormControl 
                                type='number'
                                placeholder="First Level"
                                value ={this.state.perc1} 
                                name ='perc1' 
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <FormControl 
                                type='number'
                                placeholder="First Level"
                                value ={this.state.perc2} 
                                name ='perc2' 
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <FormControl 
                                type='number'
                                placeholder="First Level"
                                value ={this.state.perc3} 
                                name ='perc3' 
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <FormControl 
                                type='number'
                                placeholder="First Level"
                                value ={this.state.perc4} 
                                name ='perc4' 
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <FormControl 
                                type='number'
                                placeholder="First Level"
                                value ={this.state.perc5} 
                                name ='perc5' 
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                    <Form.Row>
                        <Col>
                            <InputGroup className="mb-3">
                                    <FormControl 
                                        type='number'
                                        placeholder="First Level"
                                        value ={this.state.imputOne} 
                                        name ='imputOne' 
                                        onChange={this.handleChange.bind(this)}
                                        required
                                    />
                                    <InputGroup.Append>
                                    <Button 
                                        variant="outline-warning"
                                        onClick = {this.setbtcValue}
                                    >
                                        BTC V
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col>
                            <FormControl 
                                type='number'
                                placeholder="Second Level" 
                                value ={this.state.imputTwo} 
                                name ='imputTwo' 
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                        </Col>
                        <Col>
                            <FormControl 
                                placeholder="Third Level" 
                                value ={this.state.imputThree} 
                                name ='imputThree'
                                onChange={this.handleChange.bind(this)}
                                disabled
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Button
                                variant="warning"
                                className='inputlevelbutton'
                                onClick = {this.calculateLevels()}
                                >
                                CALCULATE 
                        </Button>
                    </Form.Row>
                </Form>
               <Tables
                    titles = {this.titles}
                    row = {this.value}
                    howRow = '2'
                />
            </Container>
        );
    }
}

export default LevelBuilder;