import React, {useState,useEffect} from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Customers";
import Layout from "./containers/layout";
import Adminstration from "./Pages/Adminstration";
import { useDispatch } from "react-redux";
import axios from "axios";
import SignupAndLogin from "./SignupAndLogin/SignupAndLogin";
import "./App.css"
import Employees from "./Pages/Employees";
import { useSelector } from "react-redux";
import { setCustomers } from "./redux/actions/customersActions";
import { setCompanyInfo } from "./redux/actions/companyInfoActions";
import NewLayout from "./containers/NewLayout";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setIsConnected } from "./redux/actions/isLoginActions";
import { setDashboard } from "./redux/actions/dashboardActions";
import Areas from "./Pages/Areas";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const pages = [
     <Route path= "/dashboard" element = {<Dashboard/>} />,
     <Route path= "/departments" element = {<Customers/>} />,
     <Route path= "/areas" element = {<Areas/>} />,
    //  <Route path= "/products" element = {<Products/>} />,
    //  <Route path= "/sales" element = {<Sales/>} />,
     <Route path= "/emplooyees" element = {<Employees/>} />,
     <Route path= "/adminstration" element = {<Adminstration/>} />,       
    //  <Route path= "/purchases" element = {<Purchases/>} />,     
]

function App() {
  const classes=useStyles();
  const isLogin = useSelector(state => state.isLogin.isLogin)
  const isReports = useSelector(state => state.isLogin.isReports)
  const isConnected = useSelector(state => state.isLogin.isConnected)
  const [showLayout, setShowLayout] = useState(isLogin)
  const [showReports, setShowReports] = useState(isReports)
  const dispatch = useDispatch();
  const companyInfo = useSelector(state => state.companyInfo.companyInfo)


  const showHandler = () => {
    setShowLayout(true)
  }

  useEffect(()=> {
  }, [])

  useEffect(()=> {
    setShowLayout(isLogin)
    setShowReports(isReports)
  }, [isLogin, isReports])

  return (
    

   <div className="App" style={{backgroundColor: "#F0F2FA", display: "flex",
   justifyContent: "center",}}>
     {/* {!companyInfo && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>} */}
      <Router>
    {!showLayout && 
    <Route path= "/signup" element = {<SignupAndLogin
    showHandler = {showHandler}/>} />}
      {showLayout && !showReports && <NewLayout>
          <Routes>
            {pages.map(page => (
              page
            ))}
          </Routes>
        </NewLayout>}
      </Router>
    </div>
         
  );
}

export default App;
