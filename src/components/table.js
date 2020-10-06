import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Tables extends Component{

    constructor(props){
        super(props);
        this.state = {
            imputOne : '',
            imputTwo : '',
            imputThree : '',
        }
        this.counter = this.props.howRow;
    }
    createTitle = (item) => {
        var tit = item;
        var list = '';

        list = tit.map(text =>
            <th>{text}</th>
        )
        return <tr>{list}</tr>
        
    }
    buildRows = (rows, nr) =>{
        var list;
        for(var i = 0; i< nr; i++){
            list = <tbody>{this.createRow(rows[i])}</tbody>;
        }
        return list;
    }
    createRow = (rows) =>{
        var list  = '';
        var tx = rows;
        list = tx.map(text =>
            <td>{text}</td>
        )
        return <tr>{list}</tr>;
    }

    render(){
        return(
            <Table striped bordered hover className='value-table'>
                <thead>
                    {this.createTitle(this.props.titles, true)}
                </thead>
                <tbody>
                    {this.createRow(this.props.row[0])}
                    {this.createRow(this.props.row[1])}
                    {this.createRow(this.props.row[2])}
                    {this.createRow(this.props.row[3])}
                    {this.createRow(this.props.row[4])}
                </tbody>
            </Table>
        );
    }
}

export default Tables;