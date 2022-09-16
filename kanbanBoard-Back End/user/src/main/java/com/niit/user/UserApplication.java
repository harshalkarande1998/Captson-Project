package com.niit.user;

import com.niit.user.filter.JwtFilter;
import io.jsonwebtoken.Jwt;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.GenericFilterBean;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<GenericFilterBean> registerFilter()
	{
		FilterRegistrationBean<GenericFilterBean> filterRegistrationBean = new FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/user/board/*");
		return filterRegistrationBean;
	}
}
