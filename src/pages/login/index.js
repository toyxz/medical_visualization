import React from 'react';
import Background from '../../components/background';
import LoginForm from '../../components/loginForm';
import './index.scss';
import checkAuth from '../../utils/checkAuth';

class Login extends React.Component {
  componentWillMount() {
    checkAuth(location.pathname)
  }
  

  render() {
    return (
      <div style={{height: '100%'}}>
        <Background>
          <LoginForm />
        </Background>
      </div>
    );
  }
}

export default Login;
