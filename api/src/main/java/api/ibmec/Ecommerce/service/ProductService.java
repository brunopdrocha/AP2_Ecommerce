package api.ibmec.Ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import api.ibmec.Ecommerce.entity.Product;
import api.ibmec.Ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.azure.cosmos.models.PartitionKey;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAllProducts() {
        Iterable<Product> products = productRepository.findAll();
        List<Product> productList = new ArrayList<>();
        products.forEach(productList::add); // Adiciona todos os elementos do Iterable à lista
        return productList;
    }

    public List<Product> findProductByName(String productName) {
        return this.productRepository.findByProductName(productName);
    }

    public Optional<Product> findById(String productId) {
        return this.productRepository.findById(productId);
    }

    public void save(Product product) {
        product.setProductid(UUID.randomUUID().toString());
        this.productRepository.save(product);
    }

    public void delete(String productId) throws Exception {

        Optional<Product> optProduct = this.productRepository.findById(productId);

        if (optProduct.isPresent() == false)
            throw new Exception("Não encontrei o produto a ser excluido");

        this.productRepository.deleteById(productId, new PartitionKey(optProduct.get().getProductCategory()));
    }

}