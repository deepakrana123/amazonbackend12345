import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Home/MetaData";

import { Link } from "react-router-dom";
import "./Profile.css";
import Loading from "../Home/Loading";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
     {loading ? <Loading/>:(
        <Fragment>
        <MetaData title="Profile" />
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src="/" alt="mnbvcds" />
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0,10)}</p>
            </div>

            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      </Fragment>

     )}
        
   
    </Fragment>
  );
};

export default Profile;