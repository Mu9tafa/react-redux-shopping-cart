import React, { Component } from "react";
import ReactModal from "react-modal";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import formatCurrency from "./../util";

class Products extends Component {
   state = {
      showModal: false,
      product: null,
   };
   closeModalHandler = () => {
      this.setState({ showModal: false });
   };
   openModalHandler = (product) => {
      this.setState({ showModal: true, product });
   };
   render() {
      const { product } = this.state;
      return (
         <div>
            <Fade bottom cascade big>
               <ul className="products">
                  {this.props.products.map((product) => (
                     <li key={product._id}>
                        <div className="product">
                           <a
                              href={"#" + product._id}
                              onClick={() => {
                                 this.openModalHandler(product);
                              }}
                           >
                              <img src={product.image} alt={product.title} />
                              <p>{product.title}</p>
                           </a>
                           <div className="product-price">
                              <div>{formatCurrency(product.price)}</div>
                              <button
                                 onClick={() => {
                                    this.props.addToCart(product);
                                 }}
                                 className="button primary"
                              >
                                 Add to Cart
                              </button>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            </Fade>
            {product && (
               <ReactModal
                  closeTimeoutMS={100}
                  isOpen={this.state.showModal}
                  onRequestClose={this.closeModalHandler}
               >
                  <Zoom cascade>
                     <button
                        className="close-modal"
                        onClick={this.closeModalHandler}
                     >
                        X
                     </button>
                     <div className="product-details">
                        <img src={product.image} alt={product.title} />
                        <div className="product-details-description">
                           <p>
                              <strong>{product.title}</strong>
                           </p>
                           <p>{product.description}</p>
                           <p>
                              Available Sizes:{" "}
                              {product.availableSizes.map((size) => (
                                 <span>
                                    {" "}
                                    <button className="button">{size}</button>
                                 </span>
                              ))}
                           </p>
                           <div className="product-price">
                              <div>{formatCurrency(product.price)}</div>
                              <button
                                 className="button primary"
                                 onClick={() => {
                                    this.props.addToCart(product);
                                    this.closeModalHandler();
                                 }}
                              >
                                 Add To Cart
                              </button>
                           </div>
                        </div>
                     </div>
                  </Zoom>
               </ReactModal>
            )}
         </div>
      );
   }
}

export default Products;
