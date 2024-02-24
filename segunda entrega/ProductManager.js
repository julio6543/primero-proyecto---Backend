const fs = require('fs');


class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    addProduct(product) {
        let products = this.getProducts();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        let products = this.getProducts();
        let index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.saveProducts(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        let filteredProducts = products.filter(product => product.id !== id);
        this.saveProducts(filteredProducts);
    }

    saveProducts(products) {
        fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;