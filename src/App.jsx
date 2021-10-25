import React, { Component } from "react";
import Products from "./components/Products";
import data from "./data.json";

class App extends Component {
   state = {
      products: data.products,
      sizes: "",
      sort: "",
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
