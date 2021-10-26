import React, { Component } from "react";
import Products from "./components/Products";
import data from "./data.json";
import Filter from "./components/Filter";

class App extends Component {
   state = {
      filters: {
         size: "",
         sort: "",
      },
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

      return filteredProducts;
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
      this.setState({
         filters: {
            ...this.state.filters,
            sort: e.target.value,
         },
      });
   };

   filterProductsHandler = (e) => {
      this.setState({
         filters: {
            ...this.state.filters,
            size: e.target.value,
         },
      });
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
                           this.renderProducts(
                              data.products,
                              this.state.filters
                           ).length
                        }
                        sort={this.state.filters.sort}
                        size={this.state.filters.size}
                        sortProducts={this.sortProductsHandler}
                        filterProducts={this.filterProductsHandler}
                     />
                     <Products
                        products={this.renderProducts(
                           data.products,
                           this.state.filters
                        )}
                     />
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
