import "./sidebar.css";
import { useState } from "react";
import {
  Timeline,
  PermIdentity,
  Storefront,
  AttachMoney,
  // BarChart,
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const SideBar = () => {

  const [state, setState] = useState("");

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/home" className="link">
            <li id="home" className={state=== "home" ? "sidebarListItem active" : "sidebarListItem"}  onClick={(e) => setState(e.target.id)} >
              <Timeline className="sidebarIcon" />
              Analytics
            </li> 
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Data Management</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li id="users" className={state=== "users" ? "sidebarListItem active" : "sidebarListItem"}  onClick={(e) => setState(e.target.id)} >
                <PermIdentity className="sidebarIcon" />
                User/Transaction
              </li>
            </Link>
            <Link to="/products" className="link">
              <li id="products" className={state=== "products" ? "sidebarListItem active" : "sidebarListItem"}  onClick={(e) => setState(e.target.id)} >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/newproduct" className="link">
            <li id="newproduct" className={state=== "newproduct" ? "sidebarListItem active" : "sidebarListItem"}  onClick={(e) => setState(e.target.id)} >
              <AttachMoney className="sidebarIcon" />
              Product Creation
            </li>
            </Link>
            {/* <li className="sidebarListItem" >
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" >
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default SideBar;