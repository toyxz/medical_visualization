import React from 'react';
import Background from '../../components/background';
import LoginForm from '../../components/loginForm';
import './index.scss';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Background>
          <LoginForm />
        </Background>
      </div>
    );
  }
}

export default Login;
