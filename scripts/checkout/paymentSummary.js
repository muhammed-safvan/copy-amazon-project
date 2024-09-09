import { cart } from "../../data/cart.js";
import { deliveryOptionDetails } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function generatePaymentSummary(){

  const cartItems = cart.length;
  let shippingHandling = 0;
  let totalProductPrice = 0;
  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem);
    totalProductPrice += matchingProduct.priceCents*cartItem.quantity;
    deliveryOptionDetails.forEach((details) => {
      if(cartItem.deliveryOptionId === details.deliveryOptionId){
        if(shippingHandling <= details.priceCents){
            shippingHandling = details.priceCents;
        }
      }
    });
  });
  const totalBeforeTax = shippingHandling + totalProductPrice;
  const tax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + tax;

  const html = `

      <div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div>Items (${cartItems}):</div>
              <div class="payment-summary-money">$42.75</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatCurrency(shippingHandling)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatCurrency(tax)}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = html;

}