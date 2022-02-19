import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {resetCart} from "../redux/cartRedux";
import { Link } from 'react-router-dom';
import axios from "axios";
import { publicRequest } from "../apiService";

const Success = () => {
    const location = useLocation();
    const data = location.state?.stripeData;
    const cart = location.state?.products;

    const currentUser = useSelector((state) => state.user.currentUser);
    const [order, setOrder] = useState(null);

    // const token = currentUser.accessToken;
    const dispatch = useDispatch();

    useEffect(() => {
        const createOrder = async () => {
          try {
            const res = await publicRequest.post("/orders", {
              // token,
              userId: currentUser._id,
              products: cart.products.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
              })),
              amount: cart.total,
              address: data.billing_details.address,
            }, {headers: {token: `Bearer ${currentUser?.accessToken}`}});

            console.log("res", res);
            setOrder(res.data);
          } catch {}
        };
        data && createOrder();
        dispatch(resetCart());
      }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "url(https://i.ibb.co/H22Cf8y/Image-from-rawpixel-id-2905726-jpeg.jpg)",
                backgroundSize: "cover"
            }}
            >
        {order?._id
            ? `Order has been created successfully. Your order number is ${order?._id}`
            : `Success! Your order has been received!`}
        <Link to="/" style={{textDecoration:"none"}}>
          <button style={{ padding: 10, marginTop: 20, cursor: "pointer"}}>Go to Homepage</button>
        </Link>
        </div>
    );
};

export default Success