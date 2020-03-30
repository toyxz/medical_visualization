import AuthWaiting from '../pages/authWaiting';
import Login from '../pages/login';
import Register from '../pages/register';
import TipTpFillInfo from '../pages/tipToFillInfo';
import DetailInfo from '../pages/detailInfo';
import AuditState from '../pages/auditState';
import HomePage from '../pages/homePage';
import OrderForm from '../pages/orderForm';
import OrderList from '../pages/orderList';
import DataList from '../pages/dataList';
import DataShow from '../pages/dataShow';
import DetailInfoShow from '../pages/detailInfoShow';
import BuildData from '../pages/buildData';
import EmployeeList from '../pages/employeeList';
import AddEmployee from '../pages/addEmployee';
import AuditInfo from '../pages/auditInfo';
import AuditOrder from '../pages/auditOrder';
import OrderProcess from '../pages/orderProcess';
import PermissionProcess from '../pages/permissionProcess';
import MyInfo from '../pages/myInfo';

const routers = [
    // {path: "/", name: "Index", component: AuthWaiting},
    {path: "/login", name: "Login", component: Login},
    {path: "/register", name: "Register", component: Register},
    {path: "/fillForm", name: "TipTpFillInfo", component: TipTpFillInfo},
    {path: "/detailInfo", name: "detailInfo", component: DetailInfo},
    {path: "/auditState", name: "AuditState", component: {AuditState} },
    {path: "/platform", name: "HomePage", component: {HomePage} },
    {path: "/addOrder", name: "OrderForm", component: {OrderForm} },
    {path: "/myOrder", name: "OrderList", component: {OrderList} },
    {path: "/myData", name: "DataList", component: {DataList} },
    {path: "/myInfo", name: "MyInfo", component: {MyInfo} },
    {path: "/dataShow", name: "DataShow", component: {DataShow} },
    {path: "/detailInfoShow", name: "DetailInfoShow", component: {DetailInfoShow} },
    {path: "/buildData", name: "BuildData", component: {BuildData} },
    {path: "/employeeList", name: "EmployeeList", component: {EmployeeList} },
    {path: "/addEmployee", name: "AddEmployee", component: {AddEmployee} },
    {path: "/auditInfo", name: "AuditInfo", component: {AuditInfo} },
    {path: "/auditOrder", name: "AuditOrder", component: {AuditOrder} },
    {path: "/orderProcess", name: "OrderProcess", component: {OrderProcess} },
    {path: "/permissionProcess", name: "PermissionProcess", component: {PermissionProcess} },
];

export default routers;

