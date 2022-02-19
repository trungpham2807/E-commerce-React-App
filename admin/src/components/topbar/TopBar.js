import React from "react";
import "./topbar.css";
import { 
  // NotificationsNone, 
  // Language, 
  Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">TP Admin</span>
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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbaavdT8XbfZqUycEtXo2wDRF4J6l8Arytw&usqp=CAU" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
export default TopBar;