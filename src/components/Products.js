import React, { useEffect, useState, useReducer } from "react";
import Product from "../components/Product";
import { getProducts, searchProducts } from "../services/api";
import FilterBox from "./FilterBox";
import Layout from "./Layout";

const filterReducer = (filter, action) => {
  switch (action.type) {
    case "SET_AVAILABLE_STATUS": {
      return {
        ...filter,
        availableOnly: action.payload,
      };
    }
    case "SET_PRICE_RANGE": {
      return {
        ...filter,
        price: action.payload,
      };
    }
    case "SET_SEARCH": {
      return {
        ...filter,
        search: action.payload,
      };
    }
    default: {
      return filter;
    }
  }
};
const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, filterDispatch] = useReducer(filterReducer, {
    availableOnly: false,
    price: {
      min: 0,
      max: 100,
    },
    search: null,
  });
  const onSearch = async () => {
    const { data: products } = await searchProducts(filter);
    setProducts(products);
  };

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);
  return (
    <Layout>
      <div className="products_page">
        <FilterBox
          dispatch={filterDispatch}
          filter={filter}
          onSearch={onSearch}
        />

        <div className="products">
          {products.map((product) => (
            <Product {...product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
