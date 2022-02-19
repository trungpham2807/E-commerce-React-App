import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Product from '../components/Product'
const Container = styled.div`
`;
const Title = styled.h1`
    margin: 20px;
    text-align: center;
    font-weight: 300;
    font-size: 40px;
`;
const Search = () => {
    let searchProduct = JSON.parse(localStorage.getItem("Search"));
    const [search, setSearch] = useState(searchProduct);
    console.log("search", searchProduct);

    useEffect(() => {
        setSearch(searchProduct);
    }, [searchProduct]);

    return (
        <Container>
            {/* <AnnouncementBar/> */}
            <Navbar/>
            <Title>Your Search Result:</Title>
            {
                searchProduct && searchProduct?.map((e, index) => {                 
                return  <Product item={e} key={index}/>
                })
            }
            <Footer/>
        </Container>
    )
}
export default Search;