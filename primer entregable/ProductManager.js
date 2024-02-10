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
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct("Procesador RYZEN 7-1700", "Procesador de 7ma generación, 6 núcleos, 6 HILOS", 350, "imagen_procesador_R7",);

try {
    console.log(productManager.getProductById(productManager.getProducts()[0].id));
} catch (error) {
    console.error('¡Ups, ocurrió un error!');
}