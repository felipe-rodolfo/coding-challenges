import { Stock } from "./Stock";

type ItemCart = {
    productId: string,
    quantity: number
}

export class ShoppingCart {

    private cart: ItemCart[];
    private stock: Stock;


    constructor(stock: Stock){ 
        this.stock = stock;
        this.cart = [];
    }

    add(productId: string, quantity: number): void {
        if (this.stock.isAvailable(productId, quantity)) {
            const existingItem = this.cart.find(item => item.productId === productId);

            if(existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.push({productId, quantity});
            }
            this.stock.remove(productId, quantity);
        }
    }

    getAll() {
        return this.cart;
    }

    remove(productId: string): void {
        const item = this.cart.find(i => i.productId === productId);
        if(item) {
            this.cart = this.cart.filter(i => i.productId !== productId);
            this.stock.addQuantity(productId, item.quantity);
        }
    }
}