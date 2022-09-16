package com.niit.apiService.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoutesConfiguration {

    @Bean
    public RouteLocator locateRoutes(RouteLocatorBuilder routeLocatorBuilder){
        return routeLocatorBuilder.routes()
                .route(p-> p
                        .path("/authenticate/**")
                        .uri("http://localhost:8081"))
                .route(p-> p
                        .path("/user/**")
                        .uri("http://localhost:8082"))
                .route(p-> p
                        .path("/boards/**")
                        .uri("http://localhost:8083"))
                .route(p-> p
                        .path("/notifications/**")
                        .uri("http://localhost:8084"))
                .route(p->p
                        .path("/generate")
                        .uri("http://localhost:8085"))
                .route(p->p
                        .path("/googleLogin/register")
                        .uri("http://localhost:8086"))
//                .route(p->p
//                        .path("/testchat")
//                        .uri("http://localhost:8087"))
                .build();
    }
}
