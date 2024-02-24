class ProductManager {
    constructor() {
        this.products = [
            {
                "id": "_ncf1asmz9",
                "title": "Laptop ",
                "description": "Laptop DELL.",
                "price": 1200,
                "thumbnail": "laptop.jpg",
                "code": "hp001",
                "stock": 10
            },
            {
                "id": "_kc7z3tjss",
                "title": "PC Gamer Red Dragon",
                "description": "Potente PC de escritorio diseñado para juegos de alta gama con Ryzen 9 y RTX 3080.",
                "price": 2500,
                "thumbnail": "pc_gamer.jpg",
                "code": "awr10",
                "stock": 5
            }
        ];
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

console.log("Lista de productos inicial:");
console.log(productManager.getProducts());

try {
    productManager.addProduct("Nuevo Producto", "Descripción del nuevo producto", 999, "new_product.jpg", "new001", 20);
    console.log("Lista de productos después de agregar un nuevo producto:");
    console.log(productManager.getProducts());
} catch (error) {
    console.error(error.message);
}

try {
    console.log("Obtener el producto por ID:");
    console.log(productManager.getProductById(productManager.getProducts()[0].id));
} catch (error) {
    console.error('¡Ups, ocurrió un error al obtener el producto por ID!');
}

try {
    productManager.updateProduct(productManager.getProducts()[0].id, { price: 250 });
    console.log("Lista de productos después de actualizar el precio:");
    console.log(productManager.getProducts());
} catch (error) {
    console.error('¡Ups, ocurrió un error al actualizar el producto!');
}

try {
    productManager.deleteProduct(productManager.getProducts()[0].id);
    console.log("Lista de productos después de eliminar un producto:");
    console.log(productManager.getProducts());
} catch (error) {
    console.error('¡Ups, ocurrió un error al eliminar el producto!');
}
