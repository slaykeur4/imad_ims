'use strict';

import React from 'react';
import {browserHistory} from 'react-router';
import { FormGroup, FormControl, ControlLabel, Alert, Button } from 'react-bootstrap';
import $ from 'jquery';

class FormBlock extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // loading: true,
      error: false,
      errors: [],
      name : '',
      desc : '',
      price : ''
    };
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    if (this.state.name == '' || this.state.desc == '' || this.state.price == '') {
      this.setState({'errors': ["Please fill the required fields"]});
      this.setState({'error': true});
    } else {

      if (
        this.getValidationStateDesc() == "error" || this.getValidationStateName() == "error" || this.getValidationStatePrice() == "error"
      ) {
        this.setState({'errors': ["Please fill the required fields"]});
        this.setState({'error': true});
      } else {
        if (!isNaN(parseFloat(this.state.price)) && isFinite(this.state.price)) {

          this.setState({'errors': []});
          this.setState({'error': false});

          var data = {
            name: this.state.name,
            desc: this.state.desc,
            price: this.state.price
          }
          $.ajax({
            type: 'POST',
            url: '/api/products/add',
            data: data
          })
            .done(function (data) {
              browserHistory.push({
                pathname: '/',
                state: {
                  message: "The product was added successfully."
                }
              });
            })
            .fail(function (jqXhr) {
              console.log('finternal server error');
            });
        } else {
          this.setState({'errors': ["The price needs to ba a number"]});
          this.setState({'error': true});
        }
      }
    }
  }

    getValidationStateName() {
    const length = this.state.name.length;
    if (length > 5) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  getValidationStateDesc() {
    const length = this.state.desc.length;
    if (length > 4) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  getValidationStatePrice() {
    const length = this.state.price.length;
    if (length > 1) return 'success';
    else if (length > 1) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChangeName() {

    this.setState({ name: this.refs.name.value });
  }

  handleChangeDesc() {
    this.setState({ desc: this.refs.desc.value });
  }

  handleChangePrice() {

    this.setState({ price: this.refs.price.value });
  }


  render() {
    return (
        <form className="form-signin" onSubmit={this.processForm.bind(this)} >
          <h2 className="form-signin-heading">Please fill the product information</h2>
          { this.state.error ? <Alert bsStyle="danger"><b>{this.state.errors}</b></Alert> : null }


          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStateName()}
          >
            <ControlLabel>Name * :</ControlLabel>
            <input
              className="form-control"
              type="text"
              ref="name"
              value={this.state.name}
              placeholder="Name"
              onChange={ (e) => { this.handleChangeName(); } }
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStateDesc()}
          >
            <ControlLabel>Desc * :</ControlLabel>
            <input
              className="form-control"
              type="text"
              ref="desc"
              value={this.state.desc}
              placeholder="Desccription"
              onChange={ (e) => { this.handleChangeDesc(); } }
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStatePrice()}
          >
            <ControlLabel>Price * :</ControlLabel>
            <input
              className="form-control"
              type="text"
              ref="price"
              value={this.state.price}
              placeholder="Price"
              onChange={ (e) => { this.handleChangePrice(); } }
            />
            <FormControl.Feedback />
          </FormGroup>

          <input type="submit" className="btn btn-lg btn-primary btn-block" value="Add"/>
        </form>
    );
  }
}

// FormBlock.propTypes = {
//   onSubmit: React.PropTypes.func.isRequired,
//   onChange: React.PropTypes.func.isRequired,
//   errors: React.PropTypes.object.isRequired,
//   user: React.PropTypes.object.isRequired
// };

export {FormBlock as default};
