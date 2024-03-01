const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/products', productRoutes);


app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});