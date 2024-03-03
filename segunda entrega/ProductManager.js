const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
            product.id = lastProductId + 1;
            products.push(product);
            await this.saveProducts(products);
            return product.id;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...updatedFields };
                await this.saveProducts(products);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await this.saveProducts(products);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    async saveProducts(products) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
            throw error;
        }
    }
}

module.exports = ProductManager;