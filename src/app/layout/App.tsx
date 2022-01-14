import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    fetch('http://localhost:5232/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  },[]) //bez pustego nawiasu kwadratowego ten hook będzie wykonywał się przy każdym re-renderowaniu

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      { 
        id: prevState.length + 101,
        name: "product " + (prevState.length + 1), 
        price: (prevState.length * 100) + 100, 
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200'
      },
    ]);
  }

  return (
    <div className="app">
      <h1 style={{ color: "green" }}>Re-Store</h1>
      <Catalog/>
      <ul>
        {/* {products.map((item, index) => ( */}
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} zł
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </div>
  );
}

export default App;
