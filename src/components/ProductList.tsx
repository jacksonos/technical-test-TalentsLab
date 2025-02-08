import ProductCard from "./ProductCard"
import type { Product } from '../types'

interface ProductListProps {
  products: Product[]
  addToCart: (product: Product) => void
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  )
}

export default ProductList

