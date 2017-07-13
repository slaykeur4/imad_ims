'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Table, Button, Alert } from 'react-bootstrap';
// import $ from 'jquery';
import axios from 'axios';

export default class IndexPageAdmin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products : [],
      alertVisible: false,
      message : ''
    };
  }

  componentDidMount(){
    axios
      .get('/api/products')
      .then(({ data })=> {
        this.setState({
          products: data
        });
      });
    if(this.props.location.state !== null) {
      this.setState({
        message: this.props.location.state.message,
        alertVisible: true
      });
    }
  }

  handleAlertDismiss() {
    this.setState({
      message: '',
      alertVisible: false
    });
  }

  render() {
    // const products = this.state.products;
    // console.log(products);
    // const products = this.state.products.toArray().map((el, index) => {
    //   return <div key={index}>
    //     <p>Title - { el.data.name }</p>
    //     <p>Author - { el.data.desc }</p>
    //   </div>
    // });
    return (
        <div className="container" >
          <h1>Product listing</h1>
          { this.state.alertVisible ? <Alert bsStyle="success" onDismiss={this.handleAlertDismiss.bind(this)}>
            <h4>{this.state.message}</h4>
            <p>
              <Button onClick={this.handleAlertDismiss.bind(this)}>Hide</Button>
            </p>
          </Alert> : null }

          <br/><Link to="/product/add/" className="btn btn-theme"><Button bsStyle="success">Add product</Button></Link>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {this.state.products.map(products => {
              return (
                <tr>
                  <th>{products.id}</th>
                  <th>{products.name}</th>
                  <th>{products.desc}</th>
                  <th>{products.price}</th>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </div>
    );
  }
}
