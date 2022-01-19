import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LandingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:5232/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []); //bez pustego nawiasu kwadratowego ten hook będzie wykonywał się przy każdym re-renderowaniu

  useEffect(() => {
    agent.Catalog.list().then(products =>setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  }, []); //bez pustego nawiasu kwadratowego ten hook będzie wykonywał się przy każdym re-renderowaniu

  if (loading) {
    return <LoadingComponent message="Loading products..."/>
  }

    return (
      <>
        <h1>Catalog</h1>
        <ProductList products={products}/>
      </>
    );
  }
