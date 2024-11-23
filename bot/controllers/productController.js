const { fetchProducts } = require('../services/productService');

async function listProducts() {
  try {
    console.log('[listProducts]: Iniciando busca por produtos...');
    const products = await fetchProducts();

    if (!Array.isArray(products) || products.length === 0) {
      console.warn('[listProducts]: Nenhum produto disponível.');
      return 'Não há produtos disponíveis no momento.';
    }

    let response = 'Aqui estão os nossos produtos disponíveis:\n';
    products.forEach((product) => {
      const price = product.price ? `R$${product.price.toFixed(2)}` : 'Preço indisponível';
      response += `- ${product.productName} (${product.productCategory}) por ${price}\n`;
    });

    console.log('[listProducts]: Produtos formatados com sucesso.');
    return response;
  } catch (error) {
    console.error('[listProducts]: Erro ao listar produtos:', error.message || error);
    return 'Houve um problema ao buscar os produtos. Por favor, tente novamente mais tarde.';
  }
}

module.exports = { listProducts };
