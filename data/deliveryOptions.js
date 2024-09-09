import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "../scripts/utils/money.js";


export const deliveryOptionDetails = [
    {
        deliveryOptionId :'1',
        deliveryDays : 7,
        priceCents : 0
    },{
        deliveryOptionId :'2',
        deliveryDays : 3,
        priceCents : 499
    },{
        deliveryOptionId :'3',
        deliveryDays : 1,
        priceCents : 999
    }
];

 export function generateDeliveryOptionHTML(matchingProduct){
    console.log(matchingProduct.productId);
    
    let html='';
    deliveryOptionDetails.forEach((option) => {

        html += `
        <div class="delivery-option">
            <input type="radio" 
                ${option.deliveryOptionId === matchingProduct.deliveryOptionId
                ?"checked":''
                }
                class="delivery-option-input
                js-delivery-option-input"
                name="delivery-option-${matchingProduct.productId}"
                data-product-id = "${matchingProduct.productId}"
                data-delivery-option-id = "${option.deliveryOptionId}"
            >
            <div>
            <div class="delivery-option-date">
                ${getDateString(option.deliveryDays)}
            </div>
            <div class="delivery-option-price">
                ${option.priceCents ? formatCurrency(option.priceCents) : 'FREE'} Shipping
            </div>
            </div>
        </div>
        `;
    });
    return html;
}

export function getDateString(days){
    const today = dayjs();
    const deliveryDate = today.add(days,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}

export function getDeliveryDays(optionId){
    let dateString='';
    deliveryOptionDetails.forEach((details) => {
        if(optionId === details.deliveryOptionId){
            dateString= getDateString(details.deliveryDays);
        }
    });
    return dateString;
}

