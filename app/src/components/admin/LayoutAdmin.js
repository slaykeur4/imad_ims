'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import {Navbar} from 'react-bootstrap';

class LayoutAdmin extends React.Component {

  constructor(){
    super();
    this.state = {};
  }

  componentWillMount(){
    // Called the first time the component is loaded right before the component is added to the page
  }

  componentDidMount(){
    // Called after the component has been rendered into the page
  }

  componentWillReceiveProps(nextProps){
    // Called when the props provided to the component are changed
  }

  componentWillUpdate(nextProps, nextState){
    // Called when the props and/or state change
  }

  componentWillUnmount(){
    // Called when the component is removed
  }

  render() {
    return (
      <div className="app-container">
        <header>
          {/* Fixed navbar */}
          <div className="navbar navbar-default navbar-fixed-top" role="navigation">
            <Navbar collapseOnSelect>
              <Navbar.Header className="navbar-header">
                <Navbar.Brand>
                  <Link to="/">Imad's epic inventory management system</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
            </Navbar>
          </div>
        </header>

        <div className="app-content">{this.props.children}</div>

        <footer>
          <div id="footerwrap">
            <div className="container">
                  <h4>2017 by imad</h4>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export { LayoutAdmin as default };
