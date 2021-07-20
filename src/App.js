import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/app';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
  }
  componentDidMount() {
    this.db.collection('products').onSnapshot((snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });

      this.setState({
        products,
        loading: false,
      });
    });
  }
  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log('firebase updated Successfully');
      })
      .catch(() => {
        console.log('firebase updation failed');
      });
  };
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        if (this.state.products[index].qty === 0) {
          this.handleDeleteProduct(product.id);
        }
        console.log('firebase updated Successfully');
      })
      .catch(() => {
        console.log('firebase updation failed');
      });
  };
  handleDeleteProduct = (id) => {
    // const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items,
    // });

    const docRef = this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(() => {
        console.log('Deleted Successfully');
      })
      .catch(() => {
        console.log('Deletion failed');
      });
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
      return;
    });

    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    for (var product of products) {
      cartTotal = cartTotal + product.qty * product.price;
    }
    return cartTotal;
  };
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {loading && <h1>Loading...</h1>}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {!loading && (
          <div style={{ padding: 10, fontSize: 20 }}>
            TOTAL: {this.getCartTotal()}{' '}
          </div>
        )}
      </div>
    );
  }
}

export default App;
