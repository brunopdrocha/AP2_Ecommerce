package api.ibmec.Ecommerce;

import com.azure.spring.data.cosmos.repository.config.EnableCosmosRepositories;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableCosmosRepositories(basePackages = "api.ibmec.Ecommerce.repository")
public class EcommerceApplication {

	public static void main(String[] args) {
		//Desliga a validação do certificado
		System.setProperty("javax.net.ssl.trustStore", "NUL");
		System.setProperty("javax.net.ssl.trustStoreType", "Windows-ROOT");
		SpringApplication.run(EcommerceApplication.class, args);
	}

}