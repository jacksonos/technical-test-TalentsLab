interface CartIconProps {
  itemCount: number
  onClick: () => void
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onClick }) => {
  return (
    <div className="cart-icon" onClick={onClick}>
      🛒 <span className="item-count">{itemCount}</span>
    </div>
  )
}

export default CartIcon

