import type React from 'react';
import type { Product } from '../types';
import { isValidOfferPrice, getDisplayPrice } from '../utils/priceUtils';
interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const price = Number.parseFloat(product.price);
  const hasValidOfferPrice = isValidOfferPrice(product.offer_price);
  const displayPrice = getDisplayPrice(product.price, product.offer_price);
  
  return (
    <div className='product-card'>
      <img src={product.image || '/placeholder.svg'} alt={product.name} />
      <h4>{product.name}</h4> 
      <p>Cód: {product.bar_code}</p>
      {hasValidOfferPrice ? (
        <>
          <p className='price-linethrough'>Precio: {price.toFixed(2)}</p>
          <p className='offer-price'>Oferta: S/{displayPrice.toFixed(2)}</p>
        </>
      ) : (
        <p className='price'>Precio: S/{price.toFixed(2)}</p>
      )}
      <button className='button-addToCart' onClick={() => addToCart(product)}>Añadir</button>
    </div>
  );
};

export default ProductCard;
