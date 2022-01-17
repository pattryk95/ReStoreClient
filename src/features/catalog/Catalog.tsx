import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:5232/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []); //bez pustego nawiasu kwadratowego ten hook będzie wykonywał się przy każdym re-renderowaniu

  useEffect(() => {
    agent.Catalog.list().then(products =>setProducts(products))
  }, []); //bez pustego nawiasu kwadratowego ten hook będzie wykonywał się przy każdym re-renderowaniu

    return (
      <>
        <h1>Catalog</h1>
        <ProductList products={products}/>
      </>
    );
  }
