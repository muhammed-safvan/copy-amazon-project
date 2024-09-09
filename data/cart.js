import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cartItems'))

||

[{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId : '1'
},{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
    deliveryOptionId : '2'
}];

// this (addToCart) function either add a new product to the cart or increase the quantity of existing product by one
export function addToCart(productId){

    let productExist = false;
    cart.forEach((cartItem) =>{

        if(productId === cartItem.productId){
            cartItem.quantity ++ ;
            productExist = true;
        }

    });

    if(!productExist){

        cart.push({
            productId : productId,
            quantity : 1,
            deliveryOptionId : '1'
        });

    }
    saveToStorage('cartItems');
    console.log(cart);
}//addToCart function ends here

//this function save cart in storage
export function saveToStorage(){
    localStorage.setItem('cartItems',JSON.stringify(cart));
}

export function removeFromCart(productId){
    
    let newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
    console.log(cart);   
}


export function getCartQuantity(matchingProduct,cartQuantity){
    cartQuantity = matchingProduct.quantity;
    return cartQuantity;
}