import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

// Components
import Product from '../product/product'
import WishList from '../wishlist/wishlist'


import HttpService from '../services/http-service';

const http = new HttpService();

//props = cant be changed (brown eyes)
//state = can be changed (humor) -setstate use when u want to reload ui

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { products: [] }

    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }

  loadData = () => {
    var self = this;
    http.getProducts().then(data => {
      self.setState({ products: data })
    }, err => {

    });
  }

  productList = () => {
    const list = this.state.products.map((product) =>
      <div className="col-sm-4" key={product._id}>
        <Product price={product.price} title={product.title} imgUrl={product.imgUrl} />
      </div>
    )
    return list
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container-fluid App-main">
            <div className="row">
              <div className="col-sm-8">
                <div className="row">
                  {this.productList()}
                </div>
              </div>
              <div className="col-sm-4">
                <WishList />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
