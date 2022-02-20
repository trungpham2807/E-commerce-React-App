import {useState} from "react";
import "./newProduct.css";
import {addProduct} from "../../redux/apiCall";
import {useDispatch} from "react-redux";

export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return {...prev, [e.target.name]: e.target.value};
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = {...inputs, categories: cat};
    addProduct(product, dispatch);
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input 
            name="img"
            type="text" 
            placeholder="image url"
            onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text" 
            placeholder="title"
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input 
            name="desc"
            type="text"
            placeholder="This clothes's about..."
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input 
            name="desc"
            type="text"
            placeholder="color.."
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Seller</label>
          <input 
            name="seller"
            type="text" 
            placeholder="Seller"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
            name="stock"
            type="text" 
            placeholder="123"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input 
            name="sizeNum"
            type="text" 
            placeholder="L, M"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input 
            name="price"
            type="text" 
            placeholder="123"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input 
            type="text" 
            placeholder="women, men.."
            onChange={handleCat} />
        </div>

        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}