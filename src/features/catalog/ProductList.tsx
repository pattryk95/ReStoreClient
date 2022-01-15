import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

export default function ProductList({products} : Props){
    return(
        <List>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </List>
    )
}

interface Props{
    products: Product[];
}