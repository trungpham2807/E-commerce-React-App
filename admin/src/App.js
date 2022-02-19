import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "./pages/home/Home";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/topbar/TopBar";
import "./App.css";
const App = () => {
  // update user from store when login/ register
  // const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <TopBar/>
      <div className="container"> 
        <SideBar/>
        <Routes>
       <Route path="/" element = {<Home/>} />
      </Routes>
      </div>
     
    </Router>
  )
};

export default App;