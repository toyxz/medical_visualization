import React from 'react';
import Background from '../../components/background';
import RegisterForm from '../../components/registerFrom';
import './index.scss';
import checkAuth from '../../utils/checkAuth';

class Register extends React.Component {
  componentWillMount() {
    checkAuth(location.pathname)
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Background>
          <RegisterForm />
        </Background>
      </div>
    );
  }
}

export default Register;
