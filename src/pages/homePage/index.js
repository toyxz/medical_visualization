import React from 'react';

import Banner from '../../components/banner';
import './index.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Banner />
        <div className="main">
          <div className="container">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
