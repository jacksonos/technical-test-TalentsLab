import type React from 'react';
import type { CartItem } from '../types';
import { getDisplayPrice } from '../utils/priceUtils';

interface CartProps {
  //Funciones props cerrar / + / - / eliminar
  items: CartItem[];
  onClose: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const total = items.reduce((sum, item) => {
    const price = getDisplayPrice(item.price, item.offer_price);
    return sum + price * item.quantity;
  }, 0);

  // Ordenar por nombre
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='cart'>
      <div className='cart-header'>
        <h2>Carrito de compras</h2>
        <button className='close-button' onClick={onClose}>
          Atrás
        </button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className='cart-table'>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => {
              const price = getDisplayPrice(item.price, item.offer_price);
              return (
                <tr key={item.id} className=''>
                  <td className='cName'>{item.name}</td>
                  <td>
                    <button onClick={() => onDecrement(item.id)}>-</button>
                    {item.quantity}
                    <button onClick={() => onIncrement(item.id)}>+</button>
                  </td>
                  <td>${price.toFixed(2)}</td>
                  <td>${(price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className='remove-button'
                      onClick={() => onRemove(item.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className='cart-total'>
        <strong>Total: S/{total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Cart;
