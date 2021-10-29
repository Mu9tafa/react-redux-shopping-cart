import React, { Component } from "react";
import formatCurrency from "../util";

export class Cart extends Component {
   state = {
      showCheckout: false,
   };
   render() {
      return (
         <div>
            <div>
               {this.props.cartItems.length === 0 ? (
                  <div className="cart cart-header">Cart is Empty</div>
               ) : (
                  <div className="cart cart-header">
                     You have {this.props.cartItems.length} items in the cart
                  </div>
               )}
            </div>
            <div className="cart">
               <ul className="cart-items">
                  {this.props.cartItems.map((item) => (
                     <li>
                        <div>
                           <img src={item.image}></img>
                        </div>
                        <div>
                           <div>{item.title}</div>
                           <div className="right">
                              {formatCurrency(item.price)} X {item.count}{" "}
                              <button
                                 onClick={() => {
                                    this.props.removeFromCart(item);
                                 }}
                              >
                                 Remove
                              </button>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
            {this.props.cartItems.length !== 0 && (
               <div>
                  <div className="cart">
                     <div className="total">
                        <div>
                           Total:{" "}
                           {formatCurrency(
                              this.props.cartItems.reduce(
                                 (total, curVal) =>
                                    total + curVal.price * curVal.count,
                                 0
                              )
                           )}
                        </div>
                        <button
                           className="button primary"
                           onClick={this.setState({ showCheckout: true })}
                        >
                           Proceed
                        </button>
                     </div>
                  </div>
                  {this.state.showCheckout && (
                     <div className="cart">
                        <form onSubmit={this.createOrder}>
                           <ul>
                              <li>
                                 <label>
                                    <input
                                       type="email"
                                       required
                                       onChange={this.inputHandler}
                                    />
                                 </label>
                              </li>
                           </ul>
                        </form>
                     </div>
                  )}
               </div>
            )}
         </div>
      );
   }
}

export default Cart;
