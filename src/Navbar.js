import React from 'react';

const Navbar = (props) => {
  return (
    <div style={styles.nav}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          fontSize: 28,
          fontFamily: 'monospace',
        }}
      >
        Cart
      </div>
      <div style={styles.cartIconContainer}>
        <img
          style={styles.cartIcon}
          src="https://image.flaticon.com/icons/svg/2121/2121815.svg"
          alt="cart-icon"
        />
        <span style={styles.cartCount}> {props.count} </span>
      </div>
    </div>
  );
};

const styles = {
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  nav: {
    height: 70,
    background: 'yellow',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  cartIconContainer: {
    position: 'absolute',
    right: 0,
  },
  cartCount: {
    background: 'black',
    color: 'white',
    borderRadius: '50%',
    padding: '4px 8px',
    position: 'absolute',
    right: 0,
    top: -9,
  },
};

export default Navbar;
