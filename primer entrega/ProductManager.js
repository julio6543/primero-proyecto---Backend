class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            throw new Error('El código del producto ya existe');
        }

        const id = Math.random().toString(36).substr(2, 9);
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);

        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }

        return product;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }


        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }


        this.products.splice(productIndex, 1);
    }
}


const productManager = new ProductManager();


console.log(productManager.getProducts());


productManager.addProduct("producto ", "Este es un producto ", 200, "Sin imagen", "jk94", 25);


console.log(productManager.getProducts());


try {
    console.log(productManager.getProductById(productManager.getProducts()[0].id));
} catch (error) {
    console.error('¡Ups, ocurrió un error al obtener el producto por ID!');
}


try {
    productManager.updateProduct(productManager.getProducts()[0].id, { price: 250 });
    console.log(productManager.getProducts());
} catch (error) {
    console.error('¡Ups, ocurrió un error al actualizar el producto!');
}


try {
    productManager.deleteProduct(productManager.getProducts()[0].id);
    console.log(productManager.getProducts());
} catch (error) {
    console.error('¡Ups, ocurrió un error al eliminar el producto!');
}