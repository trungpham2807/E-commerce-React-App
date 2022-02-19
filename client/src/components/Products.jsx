import styled from "styled-components";
import Product from "./Product";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {publicRequest} from "../apiService"

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // GET PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : "/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
// GET FILTER PRODUCT (Color + Size)
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
                // filter objects, check if item include filter or not -> every item take key and value
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  // GET FILTER PRODUCT (Newest + Price Asc + Price Desc)
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    // 
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
        // max 8 updated items render to homepage
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

