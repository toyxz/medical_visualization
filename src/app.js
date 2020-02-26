import React from 'react';
import ReactDom from 'react-dom';
import {
  Switch, Route, BrowserRouter as Router, browserHistory,
} from 'dva/router';
import Login from './pages/login';
import Register from './pages/register';
import TipTpFillInfo from './pages/tipToFillInfo';
import DetailInfo from './pages/detailInfo';
import AuditInfo from './pages/auditInfo';
import HomePage from './pages/homePage';
import OrderForm from './pages/orderForm';
import OrderList from './pages/orderList';
import DataList from './pages/dataList';
import DataShow from './pages/dataShow';
import DetailInfoShow from './pages/detailInfoShow';
import BuildData from './pages/buildData';
import EmployeeList from './pages/employeeList';
import AddEmployee from './pages/addEmployee';


class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div className="wrapper">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/fillForm" component={TipTpFillInfo} />
            <Route path="/detailInfo" component={DetailInfo} />
            <Route path="/auditInfo" component={AuditInfo} />
            <Route path="/platform" component={HomePage} />
            <Route path="/addOrder" component={OrderForm} />
            <Route path="/myOrder" component={OrderList} />
            <Route path="/myData" component={DataList} />
            <Route path="/dataShow" component={DataShow} />
            <Route path="/detailInfoShow" component={DetailInfoShow} />
            <Route path="/buildData" component={BuildData} />
            <Route path="/employeeList" component={EmployeeList} />
            <Route path="/addEmployee" component={AddEmployee} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
