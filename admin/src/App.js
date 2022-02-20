import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {useSelector} from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/topbar/TopBar";
import UserList from "./pages/userList/UserList";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct  from "./pages/newProduct/newProduct";
import "./App.css";
const App = () => {
  // update user from store when login/ register
  const user = useSelector(state => state.user.currentUser)
  const onlyAdmin = useSelector((state) => state.user.currentUser?.isAdmin);
  return (
    <Router>
       <TopBar />
          <div className="container">
        <SideBar />
        <Routes>
        <Route path="/" element = {<Login/>} />
        { onlyAdmin && (
          <>
             <Route path="/home" element = {<Home/>} /> 
             <Route path="/users" element = {<UserList/>} />
             <Route path="/products" element = {<ProductList/>} />
             <Route path="/product/productId" element = {<Product/>} />
             <Route path="/newproduct" element = {<NewProduct/>} />

          </>
        )}    
      </Routes>
      </div>

     
     
    </Router>
  )
};

export default App;