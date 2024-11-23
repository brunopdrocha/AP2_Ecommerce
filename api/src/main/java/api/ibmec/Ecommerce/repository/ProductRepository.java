package api.ibmec.Ecommerce.repository;

import api.ibmec.Ecommerce.entity.Product;
import com.azure.spring.data.cosmos.repository.CosmosRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CosmosRepository<Product, String> {
    List<Product> findByProductName(String productName);

}