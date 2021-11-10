import React ,{useEffect, useState} from "react";
import {useSelector} from "react-redux";
import './App.css';
import Footer from "./Footer";
import WebFont from "webfontloader";
import Home from "./Components/Home/Home"
import {BrowserRouter as Router , Route,Switch} from "react-router-dom";
import Header from './Header';
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Product/Products";
import Search from "./Components/Product/Search";
import About from "./Components/Home/About";
import Contact from "./Components/Home/Contact";
import LoginSignUp from "./Components/Login/LoginSignUp";
import store from "./store";
import {loadUser} from "./actions/userAction";
import UserOptions from "./Components/Home/UserOptions";
import Profile from "./Components/Login/Profile";
 import UpdatePassword from "./Components/Login/UpdatePassword";
import UpdateProfile from "./Components/Login/UpdateProfile";

import ProtectedRoute from "./Components/Route/ProtectedRoute";
import ProductDetails from "./Components/Product/ProductDeatils";
import MyOrders from "./Components/Order/MyOrders";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import OrderDetails from "./Components/Order/OrderDeatils";
import Shipping from "./Components/Cart/Shipping";
import Payment from "./Components/Cart/Payment";
import  axios  from "axios";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
function App() {

  const [stripeApikey,setStripeapikey] =useState("");


  async function getApiKey(){
    const {data}= await axios.get("/api/v1/stripeapikey");
    setStripeapikey(data.stripeApiKey);
  }
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },

    
    });
    store.dispatch(loadUser());
    getApiKey();

  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  return (
  
    <Router>
    <Header/>
  
           {isAuthenticated===true?  (<UserOptions user={user}/>):null
          }  
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products}/>
    <Route  path="/products/:keyword" component={Products}/>
    <Route exact path="/search" component={Search} />
    <Route exact path="/about" component={About} />
    
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/login" component={LoginSignUp}/>
   
      <Route exact path="/cart" component={Cart}/> 
      <ProtectedRoute exact path="/account" component={Profile}/>
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
      <ProtectedRoute exact path="/success" component={OrderSuccess} />

      <ProtectedRoute exact path="/orders" component={MyOrders} />

      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      <ProtectedRoute exact path="/shipping" component={Shipping}/>

         <Elements stripe={loadStripe(stripeApikey)}>
      <ProtectedRoute exact path="/process/payment" component={Payment}/>
      </Elements>
      </Switch>
    <Footer/>
    </Router>
      
    
  );
}

export default App;
