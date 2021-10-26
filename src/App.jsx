import React, { Component } from "react";
import Products from "./components/Products";
import data from "./data.json";
import Filter from "./components/Filter";

class App extends Component {
   state = {
      products: data.products,
      size: "",
      sort: "",
   };
   sortProductsHandler = (e) => {
      const sort = e.target.value;
      this.setState((prevState) => ({
         sort: sort,
         products: prevState.products.sort((a, b) => {
            if (sort === "lowest") {
               if (a.price < b.price) {
                  return -1;
               } else if (a.price > b.price) {
                  return 1;
               } else {
                  return 0;
               }
            } else if (sort === "highest") {
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
         }),
      }));
   };
   filterProductsHandler = (e) => {
      if (e.target.value === "") {
         this.setState({
            size: e.target.value,
            products: data.products,
         });
      } else {
         this.setState({
            size: e.target.value,
            products: data.products.filter((product) => {
               return product.availableSizes.indexOf(e.target.value) >= 0;
            }),
         });
      }
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
                        count={this.state.products.length}
                        sort={this.state.sort}
                        size={this.state.size}
                        sortProducts={this.sortProductsHandler}
                        filterProducts={this.filterProductsHandler}
                     />
                     <Products products={this.state.products} />
                  </div>
                  <div className="sidebar">cart items</div>
               </div>
            </main>
            <footer>footer</footer>
         </div>
      );
   }
}

export default App;
