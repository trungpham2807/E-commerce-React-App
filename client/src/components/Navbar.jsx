
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import {FormControl, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Badge } from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios";
import { resetUser } from '../redux/userRedux';
import {publicRequest} from "../apiService"
const Container = styled.div`
    height: 60px;
    background-color: #f8edeb;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Center = styled.div`
    flex: 1;  
`;

const Logo = styled.h1`
    font-weight: 600;
    text-align: center;
    color: black;
`

const Right = styled.div`
    flex: 1;  
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`

const Navbar = () => {
    const user = useSelector(state => state.user.currentUser);
    const [qTitle, setQTitle] = useState("");
    const [search, setSearch] = useState([]);
    const quantity = useSelector(state => state.cart.quantity);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearchChange = (e) => {
        setQTitle(e.target.value);
    }

    useEffect(() => {
        // console.log("it's me", search);
        localStorage.setItem("Search", JSON.stringify(search));
    }, [search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await publicRequest.get(qTitle && `/products?title=${qTitle}`);
        setSearch(res.data);
        navigate(`/search`);
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(resetUser());
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleSearchChange}
                        style={{marginRight: "10px", border:"none", borderRadius:"3px", backgroundColor:"transparent"}}
                        />
                        <Search onClick={handleSubmit} style={{ color: "gray", fontSize: 16 }}/>
                    </Form>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{textDecoration:"none"}}><Logo>Trung Pham</Logo></Link>
                </Center>
                <Right>
                    { user ? (
                        <>
                           <Link to="/user" style={{textDecoration:"none", color: "black"}}>
                                <MenuItem>Hi, {user.username}</MenuItem>
                            </Link>
                            <Link to="/cart" style={{textDecoration:"none", color:"black"}}>
                                <MenuItem>
                                    <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined />
                                    </Badge>
                                </MenuItem>
                            </Link>
                            <Link to="" style={{textDecoration:"none", color: "black"}}>
                                <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                            </Link>
                        </>
                    )   :  (
                        <>
                            <Link to="/register" style={{textDecoration:"none", color: "black"}}>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link to="/login" style={{textDecoration:"none", color:"black"}}>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </>
                            )  
                    }
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar