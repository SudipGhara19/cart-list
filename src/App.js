import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
// import CartItem from './CartItem';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [
        {
          price: 99,
          title: 'Watch',
          qty: 1,
          img: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          id: 1
        },
        {
          price: 999,
          title: 'Mobile Phone',
          qty: 10,
          img: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/uk/advisor/wp-content/uploads/2020/11/phones-switch-apps.jpg',
          id: 2
        },
        {
          price: 999,
          title: 'Laptop',
          qty: 4,
          img: 'https://www.barclays.lk/mmBC/Images/LAPA9021.jpg',
          id: 3
        }
      ],
      loading: true
    };
    this.db = firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }

  componentDidMount(){
    this.db
    .collection("products")
    // .where('price', '==', 999)                   //filter by price
    // // .where('title', '==', 'Mobile Phone')     //filter by name
    // .orderBy('price', 'asc')                     //filter by price increasing order
    .onSnapshot(snapshot => {
      const products = snapshot.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({products:products, loading: false});
    });
  }

  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // 
    products[index].qty += 1;

    this.setState({
      products
    })
    // const docRef = this.db.collection('products').doc(products[index].id);

    // docRef
    // .update({
    //   qty: products[index].qty + 1
    // })
    // .then(() => {
    //   console.log('successfully updated')
    // })
    // .catch((error) => {
    //   console.log('Error: ', error)
    // })
  }


  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    products[index].qty -= 1;

    this.setState({
      products
    })
    // const docRef = this.db.collection('products').doc(products[index].id);

    // docRef
    // .update({
    //   qty: products[index].qty - 1
    // })
    // .then(() => {
    //   console.log('successfully updated')
    // })
    // .catch((error) => {
    //   console.log('Error: ', error)
    // })
  }


  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id); // [{}]

    this.setState({
      products: items
    })
    const docRef = this.db.collection('products').doc(id);

    docRef
    .delete()
    .then(() => {
      console.log('Deleted updated')
    })
    .catch((error) => {
      console.log('Error: ', error)
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const {products} = this.state;
    let cartTotal = 0

    products.map(product => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });
    return cartTotal;
  }


  addProduct = () => {
    this.db
    .collection('products')
    .add({
      img: '',
      price: 999,
      qty: 3,
      title: 'Laptop'
    })
    .then(docRef => {
      docRef.get().then(snapshot => {
        console.log('product has been added', snapshot.data)
      })
    })
    .catch(error => {
      console.log('Error : ', error)
    })
  }

  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
        {loading && <h1>Loading Products...</h1>}
        <button onClick={this.addProduct} style={{padding:20, fontSize:20, color:'grey'}}>Add a Product</button>
        <div style={{padding:10, fontSize:30}}>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
