import React from 'react';
import Background from '../../components/background';
import RegisterForm from '../../components/registerFrom';
import './index.scss';

class Register extends React.Component {
  render() {
    return (
      <div>
        <Background>
          <RegisterForm />
        </Background>
      </div>
    );
  }
}

export default Register;
