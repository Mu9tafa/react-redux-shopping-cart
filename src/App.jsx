import React, { Component } from "react";
import Products from "./components/Products";
import data from "./data.json";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends Component {
   state = {
      products: data.products,
      filteredProducts: [],
      cartItems: [],
      filters: {
         size: "",
         sort: "",
      },
   };

   addToCartHandler = (product) => {
      const cartItems = JSON.parse(JSON.stringify(this.state.cartItems));
      let alreadyInCart = false;
      cartItems.forEach((item) => {
         if (item._id === product._id) {
            item.count++;
            alreadyInCart = true;
         }
      });
      if (!alreadyInCart) {
         cartItems.push({ ...product, count: 1 });
      }
      this.setState({ cartItems });
   };

   removeFromCartHandler = (product) => {
      const cartItems = JSON.parse(JSON.stringify(this.state.cartItems));
      this.setState({
         cartItems: cartItems.filter((item) => item._id !== product._id),
      });
   };

   renderProducts = (products, filters) => {
      let filteredProducts = products.filter((product) => {
         if (filters.size === "") {
            return product;
         } else {
            return product.availableSizes.includes(filters.size);
         }
      });

      filteredProducts = this.sortProducts(filteredProducts, filters);

      // return filteredProducts;
      this.setState({
         filteredProducts,
      });
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

   sortProductsHandler = async (e) => {
      await this.setState({
         filters: {
            ...this.state.filters,
            sort: e.target.value,
         },
      });
      this.renderProducts(this.state.products, this.state.filters);
   };

   filterProductsHandler = async (e) => {
      await this.setState({
         filters: {
            ...this.state.filters,
            size: e.target.value,
         },
      });
      this.renderProducts(this.state.products, this.state.filters);
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
                        count={
                           this.state.filteredProducts.length ||
                           this.state.products.length
                        }
                        sort={this.state.filters.sort}
                        size={this.state.filters.size}
                        sortProducts={this.sortProductsHandler}
                        filterProducts={this.filterProductsHandler}
                     />
                     <Products
                        addToCart={this.addToCartHandler}
                        products={
                           this.state.filteredProducts.length
                              ? this.state.filteredProducts
                              : this.state.products
                        }
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
