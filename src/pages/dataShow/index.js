import React from 'react';

import HomePage from '../homePage';
import checkAuth from '../../utils/checkAuth';
class DataShow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HomePage>
        show data
      </HomePage>
    );
  }
}

export default DataShow;
