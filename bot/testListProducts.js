const { listProducts } = require('./controllers/productController');

(async () => {
  try {
    const products = await listProducts();
    console.log('Produtos obtidos no teste isolado:', products);
  } catch (error) {
    console.error('Erro ao buscar produtos no teste isolado:', error.message);
  }
})();
