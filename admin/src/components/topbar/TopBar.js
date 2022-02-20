import React from "react";
import "./topbar.css";
import { Link } from 'react-router-dom';

import { 
  // NotificationsNone, 
  // Language, 
  Settings} from "@material-ui/icons";
  import {useSelector, useDispatch} from 'react-redux';
  import { useNavigate } from "react-router-dom";
import { resetUser } from '../../redux/userRedux';

const TopBar = () => {
  const user = useSelector(state => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(resetUser());
    navigate("/")
}
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/home">
          <span className="logo">TP Admin</span>
          </Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
          <Link to="/">  
            <Settings />
          </Link>
          </div>
          <Link to="" onClick={handleClick} style={{textDecoration:"none", color: "black"}}>
                      LOGOUT 
           </Link>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbaavdT8XbfZqUycEtXo2wDRF4J6l8Arytw&usqp=CAU" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
export default TopBar;