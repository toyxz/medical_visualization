import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, BrowserRouter as Router, browserHistory } from 'dva/router';
import Login from './pages/login';
import Register from './pages/register';

class App extends React.Component {
  render() {
    return (
      // <h1>hehe</h1>
      <Router  history={browserHistory}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default App;
