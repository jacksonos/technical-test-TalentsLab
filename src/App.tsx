import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import Cart from './components/Cart';
import CartIcon from './components/CartIcon';
import type { Product, CartItem } from './types';
import './App.css';

const API_URL = import.meta.env.VITE_APP_API;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const uniqueProducts = response.data.filter(
          (product: Product, index: number, self: Product[]) =>
            index === self.findIndex((p) => p.id === product.id)
        );
        setProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.bar_code?.toString() ?? '').includes(query)
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const incrementCartItem = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItem = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className='app'>
      <header>
        <h1>PharmaCatalog</h1>
        <CartIcon
          itemCount={cart.reduce((total, item) => total + item.quantity, 0)}
          onClick={toggleCart}
        />
      </header>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
      {isCartOpen && (
        <Cart
          items={cart}
          onClose={toggleCart}
          onIncrement={incrementCartItem}
          onDecrement={decrementCartItem}
          onRemove={removeCartItem}
        />
      )}
    </div>
  );
};

export default App;
