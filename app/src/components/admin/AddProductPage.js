/**
 * Created by imad on 11/05/2017.
 */
'use strict';

import React from 'react';
import FormBlock from './FormBlock';

class AddProductPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <FormBlock/>
      </div>
    );
  }

};

export {AddProductPage as default};
