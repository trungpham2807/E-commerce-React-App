
import { Add, DeleteOutlined, Remove } from '@material-ui/icons';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom';

import {remQuant, addQuant, removeProduct, addProduct, resetCart} from "../redux/cartRedux";
import {useDispatch, useSelector} from "react-redux"
import {useState, useEffect} from "react"
import StripeCheckout from "react-stripe-checkout"
import {userRequest} from "../request"
import {useNavigate} from "react-router-dom"
const STRIPE_KEY = process.env.REACT_STRIKE_KEY;
const Cart = () => {
  const cart = useSelector(state => state.cart)

  const [stripeToken, setStripeToken] = useState(null)
  const onToken = (token) => {
    setStripeToken(token)
  }
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // // Render after checkout
  useEffect(()=> {
    const makeRequest = async () => {
      try{
        const res = await userRequest.post("/checkout/payment",
        {tokenId: stripeToken.id,
          amount: cart.total * 100,
        })
        navigate("/success", {data: res.data})

      }catch(err){

      }
    }
    makeRequest()
  }, [stripeToken, cart.total, navigate])
  const handleQuantity = (type, product) => {
    if (type === 'desc') {
        product.quantity > 1 && dispatch(remQuant(product))
    } else if (type === "inc" 
    // && product.quantity < product.stock
    ){
      // console.log("as")
        dispatch(addQuant(product))
    }
};

const handleDelete = (product) => {
    dispatch(removeProduct(product));
};
const handleCheckOut = (product) => {
  // dispatch(resetCart(product));
  navigate("/success")
};
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (
               <Product>
               <ProductDetail>
                 <Image src={product.img} />
                 <Details>
                   <ProductName>
                     <b>Product:</b> {product.title}
                   </ProductName>
                   <ProductId>
                     <b>ID:</b> {product._id}
                   </ProductId>
                   <ProductColor color={product.color} />
                   <ProductSize>
                     <b>Size:</b> {product.size}
                   </ProductSize>
                 </Details>
               </ProductDetail>
               <PriceDetail>
               <ProductAmountContainer>
                  <Remove style={{cursor:"pointer"}} onClick={() => handleQuantity('desc', product)}/>
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Add style={{cursor:"pointer"}} onClick={() => handleQuantity('inc', product)}/>
                </ProductAmountContainer>
                 <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                 <DeleteOutlined onClick={() => handleDelete(product)} style={{cursor: "pointer", marginTop: "10px"}}/>
               </PriceDetail>
             </Product>
            ))}
            
            <Hr />
           
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* Stripe Check out */}
            <StripeCheckout
            name="Trung Pham E-Commerce"
            image="https://file.hstatic.net/200000122283/article/shin-cau-be-but-chi_4017a723e5df4b7d91524dc0bf656c27_1024x1024.jpg"
            billingAddress
            shippingAddress
            description={`Your total is ${cart.total}$`}
            amount={cart.total*100}
            token={onToken}
            stripekey={STRIPE_KEY}>
            <Button onClick={() => handleCheckOut()}>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
