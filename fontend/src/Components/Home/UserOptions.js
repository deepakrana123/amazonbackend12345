import React ,{ Fragment, useState }from 'react';
import "./UserOptions.css";


import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
 import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
// import { logoutUser } from "../../actions/userAction";
 import {useSelector} from "react-redux";



const UserOptions=({user})=> {
    const history=useHistory();
   const alert=useAlert();
    // const dispatch=useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const options = [
        { icon: <ListAltIcon/> , name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
          },
     
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];


      // if(user.role==="admin"){
      //     options.unshift({
      //       icon: <DashboardIcon />,
      //       name: "Dashboard",
      //       func: dashboard,
      //     })
      // }


      // function dashboard(){
      //     history.push("/dashbaord")
      // }
      function orders(){
        history.push("/orders")
    }
    function account(){
        history.push("/account")
    }
    function logoutUser(){
        // dispatch(logoutUser())
    alert.success("You have been logged out");

    }
    function cart() {
      history.push("/cart");
    }
    const [open,setOpen]=useState(false);
    
    return (
    
        
        <Fragment>
        
      <Backdrop  style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
       open={open}
        style={{ zIndex: "11" }}
        
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src="/"
            alt="Profile"
          />
        }
      >

      {options.map((item)=>(
        <SpeedDialAction
      
        icon={item.icon}
        tooltipTitle={item.name}
        onClick={item.func}
        
        tooltipOpen={window.innerWidth <= 600 ? true : false}
      />

      ))}
      
      
      </SpeedDial>
    </Fragment>
        
    )
}

export default UserOptions;
