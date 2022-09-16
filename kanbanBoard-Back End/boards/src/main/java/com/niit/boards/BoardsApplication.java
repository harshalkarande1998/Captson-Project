package com.niit.boards;

import com.niit.boards.filter.JwtFilter;
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
public class BoardsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardsApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<GenericFilterBean> registerFilter()
	{
		FilterRegistrationBean<GenericFilterBean> filterRegistrationBean = new FilterRegistrationBean<>();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/boards/*");
		return filterRegistrationBean;
	}
}
