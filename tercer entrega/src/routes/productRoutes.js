const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');


router.get('/', productController.getAllProducts);
router.get('/:pid', productController.getProductById);
router.post('/', productController.addProduct);
router.delete('/:pid', productController.deleteProduct);
router.put('/:pid', productController.updateProduct);

module.exports = router;