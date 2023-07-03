import React from 'react';

class CartItem extends React.Component {
  render () {
    const { qty, price, title } = this.props.product;
    const { product } = this.props;


  return (
    <div className="cart-item">
  
      <div className="left-block">
        <img style={styles.image} src={product.img} />
      </div>
      <div className="right-block">
        <div style={ { fontSize: 25 } }>{title}</div>
        <div style={ { color: '#777' } }>Rs {price} </div>
        <div style={ { color: '#777' } }>Qty: {qty} </div>
        <div className="cart-item-actions">
          {/* Buttons */}
          <img
            alt="increase"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/561/561169.png"
            onClick={() => this.props.onIncreaseQuantity(product)}
          />
          <img
            alt="decrease"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/561/561179.png"
            onClick={() => this.props.onDecreaseQuantity(product)}
          />
          <img
            alt="delete"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/484/484611.png" 
            onClick={() => this.props.onDeleteProduct(product.id)}
          />
        </div>
      </div>
    </div>
  );
}
}

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: '#ccc'
  }
}

export default CartItem;