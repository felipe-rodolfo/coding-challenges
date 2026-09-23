export class Stock {
    private stock = [
        {
            id: "id-mouse",
            name: "Mouse sem fio",
            price: 79.90,
            quantity: 5
        },
        {
            id: "id-teclado",
            name: "Teclado mecânico",
            price: 249.90,
            quantity: 2
        },
        {
            id: "id-fone",
            name: "Fone de ouvido bluetooth",
            price: 159.90,
            quantity: 3
        },
        {
            id: "id-webcam",
            name: "Webcam Full HD",
            price: 199.90,
            quantity: 1
        },
        {
            id: "id-carregador",
            name: "Carregador USB-C",
            price: 119.90,
            quantity: 3
        }
    ];
    getAll() {
        return this.stock;
    }

    get(productId: string) {
        return this.stock.find(product => product.id === productId);
    }

    isAvailable(productId: string , quantity: number): boolean {
        return this.stock.some((productStock) => (
            productStock.id === productId && productStock.quantity >= quantity
        ))
    }

    remove(productId: string, quantity: number): void {
        const product = this.stock.find(p => p.id === productId);
        if (product) {
            product.quantity -= quantity;
        }
    }

    addQuantity(productId: string, quantity: number): void {
        const product = this.stock.find(p => productId === p.id);
        if(product) {
            product.quantity += quantity;
        }
    }
}