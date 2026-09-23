import { ShoppingCart } from "./ShoppingCart";
import { Stock } from "./Stock";

export enum PaymentMethod {
    PIX = "PIX",
    CreditCard = "creditCard"
}

export class Checkout {
    private cart: ShoppingCart;
    private stock: Stock;
    private coupon?: string;
    private method: PaymentMethod;

    constructor(cart: ShoppingCart, stock: Stock, coupon: string, method: PaymentMethod){
        this.cart = cart;
        this.stock = stock;
        this.coupon = coupon;
        this.method = method
    }

    list() {
        const items = this.cart.getAll().map(itemCart => {
            const product = this.stock.get(itemCart.productId);

            return {
                price: product?.price,
                quantity: itemCart.quantity,
                subtotal: product.price * itemCart.quantity
            }
        })
        return items;
    }

    total() {
        let total = this.list().reduce((sum, item) => sum + item.subtotal, 0)
        return this.paymentMethod(this.discount(total));
    }

    discount(value: number): number {
        let discount = 0;
        switch(this.coupon) {
            case 'PROMO10':
                discount = 0.10;
            break;

            case 'OFERTA5':
                discount = 0.05;
            break;
            default:
                discount = 0;
        }
           
        const finalValue = value * (1 - discount);
        return Number(finalValue.toFixed(2));

    }

    paymentMethod(value: number): number {
        if(this.method === PaymentMethod.PIX) {
            const discount = 0.05;
            return Number((value * (1 - discount)).toFixed(2));
        }
        return Number(value.toFixed(2));
    }

    checkout() {
        return {
            items: this.list(),
            appliedCoupon: this.coupon,
            method: this.method,
            finalValue: this.total()
        }
    }

}