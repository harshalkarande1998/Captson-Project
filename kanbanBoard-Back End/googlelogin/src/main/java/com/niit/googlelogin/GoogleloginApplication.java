package com.niit.googlelogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GoogleloginApplication {

	public static void main(String[] args) {
		SpringApplication.run(GoogleloginApplication.class, args);
	}

}
