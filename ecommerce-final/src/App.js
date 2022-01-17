import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import React, { Suspense } from 'react';
const Pdf=React.lazy(()=>import('./components/Pdf'))
const Login=React.lazy(()=>import('./components/Credential/Login'))
const Register=React.lazy(()=>import('./components/Credential/Register'))
const Disconnect=React.lazy(()=>import('./components/Disconnect'))
const Dashboard=React.lazy(()=>import('./components/Dashboard'))
const Forgotpass=React.lazy(()=>import('./components/Credential/Forgotpass'))
const MyAccount=React.lazy(()=>import('./components/MyAccount/MyAccount'))
const Orders=React.lazy(()=>import('./components/Products/Orders'))
const Products=React.lazy(()=>import('./components/Products/Products'))
const ProductDetail=React.lazy(()=>import('./components/Products/ProductDetail'))
const MainHeader=React.lazy(()=>import('./components/Layout/MainHeader'))
const MainFooter=React.lazy(()=>import('./components/Layout/MainFooter'))
const Cart=React.lazy(()=>import('./components/Products/Cart'))
const Checkout=React.lazy(()=>import('./components/Products/Checkout'))

/* import Login from "./components/Credential/Login";
import Register from "./components/Credential/Register";
import Disconnect from "./components/Disconnect";
import Dashboard from "./components/Dashboard";
import Forgotpass from "./components/Credential/Forgotpass";
import MyAccount from "./components/MyAccount/MyAccount";
import Orders from "./components/Products/Orders";
import Products from "./components/Products/Products";
import ProductDetail from "./components/Products/ProductDetail"; 
import MainHeader from "./components/Layout/MainHeader";
import MainFooter from "./components/Layout/MainFooter";
import Cart from "./components/Products/Cart";
import Checkout from './components/Products/Checkout' */

function App() {
  return (
    <div >
       <Suspense fallback={<div className='Center'><img src='/images/lazyloading.gif' /></div>}>
      <Router>
        <MainHeader />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/disconnect" exact component={Disconnect} />
          <Route path="/forgot" exact component={Forgotpass} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout}/>
          <Route path="/myaccount" exact component={MyAccount} />
          <Route path="/products" exact component={Products} />
          <Route path="/productdetails/:id" exact component={ProductDetail} />
          <Route path="/pdf/:id" exact component={Pdf} />
        </Switch>
        <MainFooter />
      </Router>
      </Suspense>
    </div>
  );
}

export default App;
