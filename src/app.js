import React from 'react';
import {
  Switch, Route, BrowserRouter as Router, browserHistory,
} from 'dva/router';
import AuthWaiting from './pages/authWaiting';
import Login from './pages/login';
import Register from './pages/register';
import TipTpFillInfo from './pages/tipToFillInfo';
import DetailInfo from './pages/detailInfo';
import AuditState from './pages/auditState';
import HomePage from './pages/homePage';
import OrderForm from './pages/orderForm';
import OrderList from './pages/orderList';
import DataList from './pages/dataList';
import DataShow from './pages/dataShow';
import DetailInfoShow from './pages/detailInfoShow';
import BuildData from './pages/buildData';
import EmployeeList from './pages/employeeList';
import AddEmployee from './pages/addEmployee';
import AuditInfo from './pages/auditInfo';
import AuditOrder from './pages/auditOrder';
import OrderProcess from './pages/orderProcess';
import PermissionProcess from './pages/permissionProcess';
import MyInfo from './pages/myInfo';

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div className="wrapper" id="wrapper">
          <Switch>
            <Route path="/" exact component={AuthWaiting} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/fillForm" component={TipTpFillInfo} />
            <Route path="/detailInfo" component={DetailInfo} />
            <Route path="/auditState" component={AuditState} />
            <Route path="/platform" component={HomePage} />
            <Route path="/addOrder" component={OrderForm} />
            <Route path="/myOrder" component={OrderList} />
            <Route path="/myData" component={DataList} />
            <Route path="/myInfo" component={MyInfo} />
            <Route path="/dataShow" component={DataShow} />
            <Route path="/detailInfoShow" component={DetailInfoShow} />
            <Route path="/buildData" component={BuildData} />
            <Route path="/employeeList" component={EmployeeList} />
            <Route path="/addEmployee" component={AddEmployee} />
            <Route path="/auditInfo" component={AuditInfo} />
            <Route path="/auditOrder" component={AuditOrder} />
            <Route path="/orderProcess" component={OrderProcess} />
            <Route path="/permissionProcess" component={PermissionProcess} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
