package api.ibmec.Ecommerce.controller;


import api.ibmec.Ecommerce.service.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import api.ibmec.Ecommerce.entity.Product;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/ecommerce/products")
public class EcommerceController {

    @Autowired
    private ProductService productService;

    // Get de Teste e introducao da API
    @GetMapping()
    public String introducao() {
        return "Olá, esta é a API do nosso e-commerce!";
    }

    // Método POST para criar um novo produto
    @PostMapping("/criar-produto")
    public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    // Método GET para obter todos os produtos
    @GetMapping("/produtos")
    public List <Product> getAllProducts() {
        return productService.findAllProducts();
    }

    // Método GET para buscar um produto pelo ID
    @GetMapping("/ver-produto/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productService.findById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }



    // Método DELETE para excluir um produto pelo ID
    @DeleteMapping("/remove-produto/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}