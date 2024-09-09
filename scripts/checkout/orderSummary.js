import {cart, removeFromCart, saveToStorage} from '../../data/cart.js';
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { generateDeliveryOptionHTML,getDeliveryDays} from '../../data/deliveryOptions.js';
import { generatePaymentSummary } from './paymentSummary.js';


export function generateOrderSummary (){

    let cartHTML='';
    cart.forEach((cartItem) => {

        let matchingProduct;

        products.forEach((product) => {

            if(cartItem.productId === product.id){
                matchingProduct = product;
            }

        });

        let html = 
        `
        <div class="cart-item-container">
            <div class="delivery-date
              js-delivery-date">
              Delivery date: ${getDeliveryDays(cartItem.deliveryOptionId)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">
                        ${cartItem.quantity}
                    </span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-link"
                  data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${generateDeliveryOptionHTML(cartItem)}
              </div>
            </div>
          </div>


        `;
       
        cartHTML += html;
    });
        

    document.querySelector('.js-order-summary')
    .innerHTML =cartHTML;
    
    document.querySelectorAll('.js-delete-link')
    .forEach((button) => {
        button.addEventListener("click",() => {
            const {productId} = button.dataset;
            removeFromCart(productId);
            generateOrderSummary();
            generatePaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option-input')
    .forEach((option) => {
      option.addEventListener('click', ()=>{
        const {productId} = option.dataset;
        const {deliveryOptionId} = option.dataset;

        cart.forEach((cartItem) => {
          if (cartItem.productId === productId){
            cartItem.deliveryOptionId = deliveryOptionId;
            saveToStorage();
            generateOrderSummary();
            generatePaymentSummary();
          }
        });
        //document.querySelector('.js-delivery-date')
        //.innerText = `${getDateString(option.deliveryDays)}`;
        
      });
    });

}
