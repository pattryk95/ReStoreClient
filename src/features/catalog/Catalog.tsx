import { Product } from "../../app/models/product";

export default function Catalog({products,addProduct }: Props) {
    return (
      <>
        <h1>Catalog</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} zł
            </li>
          ))}
        </ul>
        <button onClick={addProduct}>Add product</button>
      </>
    );
  }

// export default function Catalog(props: Props) {
//   return (
//     <>
//       <h1>Catalog</h1>
//       <ul>
//         {props.products.map((product) => (
//           <li key={product.id}>
//             {product.name} - {product.price} zł
//           </li>
//         ))}
//       </ul>
//       <button onClick={props.addProduct}>Add product</button>
//     </>
//   );
// }

interface Props {
    products: Product[];
    addProduct: () => void;
}