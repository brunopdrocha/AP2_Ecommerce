const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL || 'https://api-produtos.azurewebsites.net';

async function fetchProducts() {
  try {
    console.log('[fetchProducts]: Fazendo requisição para o endpoint de produtos...');
    const response = await axios.get(`https://api-produtos.azurewebsites.net/ecommerce/products/produtos`);
    console.log('[fetchProducts]: Produtos retornados pela API:', response.data);
    return response.data; // Retorna o array de produtos
  } catch (error) {
    console.error('[fetchProducts]: Erro ao buscar produtos da API:', error.message);
    throw new Error('Não foi possível obter os produtos da API.');
  }
}

module.exports = { fetchProducts };
