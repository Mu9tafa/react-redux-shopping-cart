import React, { Component } from "react";
import Products from "./components/Products";
import data from "./data.json";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends Component {
   state = {
      filteredProducts: data.products,
      cartItems: localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [],
      filters: {
         size: "",
         sort: "",
      },
   };

   addToCartHandler = (product) => {
      // Clone
      const cartItems = JSON.parse(JSON.stringify(this.state.cartItems));
      let alreadyInCart = false;
      // Edit
      cartItems.forEach((item) => {
         if (item._id === product._id) {
            item.count++;
            alreadyInCart = true;
         }
      });
      if (!alreadyInCart) {
         cartItems.push({ ...product, count: 1 });
      }
      // setState
      this.setState({ cartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
   };

   removeFromCartHandler = (product) => {
      // Clone
      let cartItems = JSON.parse(JSON.stringify(this.state.cartItems));
      // Edit
      cartItems = cartItems.filter((item) => item._id !== product._id);
      // setState
      this.setState({ cartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
   };

   renderProducts = (products, filters) => {
      let filteredProducts = products.filter((product) => {
         if (filters.size === "") {
            return product;
         } else {
            return product.availableSizes.includes(`${filters.size}`);
         }
      });
      filteredProducts = this.sortProducts(filteredProducts, filters);
      this.setState({ filteredProducts });
   };

   sortProducts = (filteredProducts, filters) => {
      return filteredProducts.sort((a, b) => {
         if (filters.sort === "lowest") {
            if (a.price < b.price) {
               return -1;
            } else if (a.price > b.price) {
               return 1;
            } else {
               return 0;
            }
         } else if (filters.sort === "highest") {
            if (a.price > b.price) {
               return -1;
            } else if (a.price < b.price) {
               return 1;
            } else {
               return 0;
            }
         } else {
            if (a._id > b._id) {
               return -1;
            } else if (a._id < b._id) {
               return 1;
            } else {
               return 0;
            }
         }
      });
   };

   sortProductsHandler = (e) => {
      // Clone
      let filters = JSON.parse(JSON.stringify(this.state.filters));
      // Edit
      filters = { ...filters, sort: e.target.value };
      // setState
      this.setState({
         filters,
      });
      this.renderProducts(data.products, filters);
   };

   filterProductsHandler = (e) => {
      // Clone
      let filters = JSON.parse(JSON.stringify(this.state.filters));
      // Edit
      filters = { ...filters, size: e.target.value };
      // setState
      this.setState({
         filters,
      });
      this.renderProducts(data.products, filters);
   };

   render() {
      return (
         <div className="grid-container">
            <header>
               <a href="/">React shopping cart</a>
            </header>
            <main>
               <div className="content">
                  <div className="main">
                     <Filter
                        count={this.state.filteredProducts.length}
                        sort={this.state.filters.sort}
                        size={this.state.filters.size}
                        sortProducts={this.sortProductsHandler}
                        filterProducts={this.filterProductsHandler}
                     />
                     <Products
                        addToCart={this.addToCartHandler}
                        products={this.state.filteredProducts}
                     />
                  </div>
                  <div className="sidebar">
                     <Cart
                        cartItems={this.state.cartItems}
                        removeFromCart={this.removeFromCartHandler}
                     />
                  </div>
               </div>
            </main>
            <footer>footer</footer>
         </div>
      );
   }
}

export default App;
