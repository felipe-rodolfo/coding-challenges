
import { Checkout, PaymentMethod } from "./domain/Checkout";
import { ShoppingCart } from "./domain/ShoppingCart";
import { Stock } from "./domain/Stock";

const stock = new Stock;
const cart = new ShoppingCart(stock);
cart.add("id-mouse", 2);
cart.add("id-fone", 1);
const checkout = new Checkout(cart, stock, 'PROMO10', PaymentMethod.CreditCard);
console.log(checkout.checkout());