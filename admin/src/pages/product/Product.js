import { Link, useLocation } from "react-router-dom";
import {useState, useMemo, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form ,Button} from 'react-bootstrap'
import "./product.css";
import Chart from "../../components/chart/Chart"
import { userRequest } from "../../apiService";
import { updateProducts } from "../../redux/apiCall";
import { Publish } from "@material-ui/icons";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    // console.log(location.pathname);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [img, setImg] = useState("");

    const [productStats, setProductStats] = useState([]);
    const dispatch = useDispatch();

    const MONTHS = useMemo (() => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ], []); //MONTHS will be dependency but will never change

    useEffect (() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("orders/income?proId=" + productId);
            // console.log("res", res);
            const list = res.data.sort((a, b) => {
                return a._id - b._id
            })
            list.map((item) => {
              setProductStats((prev) => [
                ...prev,
                {name: MONTHS[item._id - 1], Sales: item.total}
              ])
            })
          } catch (err) {
              console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);
      console.log(productStats);

    const product = useSelector(state => state.product?.products.find((product) => product?._id === productId));

    console.log(title, price, stock, img);
    const submitHandler = (e) => {
        e.preventDefault();
        updateProducts(product._id, title, price, stock, img, dispatch);
    }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id: </span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">{productStats[0]?.Sales} USD</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">stocks:</span>
                      <span className="productInfoValue">{product.stock} units</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
      <Form onSubmit={submitHandler} className="productFormLeft">
                <Form.Group controlId="title" style={{marginBottom: "10px"}}> 
                    <Form.Label style={{marginRight: "20px"}}>Title</Form.Label>
                    <Form.Control
                        
                        type="text"
                        placeholder="Enter title"
                        onChange={(e)=>setTitle(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price" style={{marginBottom: "10px"}}> 
                    <Form.Label style={{marginRight: "20px"}}>Price</Form.Label>
                    <Form.Control
                        
                        type="text"
                        placeholder="Enter price"
                        onChange={(e)=>setPrice(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="stock" style={{marginBottom: "10px"}}> 
                    <Form.Label style={{marginRight: "20px"}}>Stock</Form.Label>
                    <Form.Control
                        
                        type="text"
                        placeholder="Enter stock"
                        onChange={(e)=>setStock(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="img" style={{marginBottom: "10px"}}> 
                    <Form.Label style={{marginRight: "20px"}}>Image</Form.Label>
                    <Form.Control
                        
                        type="text"
                        placeholder="Enter image"
                        onChange={(e)=>setImg(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>
                <Button type='submit' className="btn margin_btn productButton" style={{width: "20%"}}>
                    Update
                </Button>
            </Form>
      </div>
    </div>
  );
}