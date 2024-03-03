const ProductManager = require('./ProductManager');

async function main() {
    try {
        const productManager = new ProductManager('products.json');

        const newProductId = await productManager.addProduct({
            title: 'NVIDIA GeForce RTX 3080',
            description: 'La tarjeta gráfica NVIDIA GeForce RTX 3080 ofrece un rendimiento de juego sin precedentes.',
            price: 899.99,
            thumbnail: 'rtx3080.jpg',
            code: 'NVDR3080',
            stock: 50
        });

        console.log('ID del nuevo producto:', newProductId);

        const allProducts = await productManager.getProducts();
        console.log('Todos los productos:', allProducts);

        const productIdToFind = 1;
        const foundProduct = await productManager.getProductById(productIdToFind);
        console.log(`Producto con ID ${productIdToFind}:`, foundProduct);

        const productIdToUpdate = 2;
        const updatedFields = {
            price: 999.99,
            stock: 60
        };
        const isUpdated = await productManager.updateProduct(productIdToUpdate, updatedFields);
        console.log(`Producto con ID ${productIdToUpdate} actualizado:`, isUpdated);

        const productIdToDelete = 3;
        await productManager.deleteProduct(productIdToDelete);
        console.log(`Producto con ID ${productIdToDelete} eliminado.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();