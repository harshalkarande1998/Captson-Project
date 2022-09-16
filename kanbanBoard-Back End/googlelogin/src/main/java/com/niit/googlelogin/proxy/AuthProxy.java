package com.niit.googlelogin.proxy;

import com.niit.googlelogin.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="authentication", url = "localhost:8081")
public interface AuthProxy {
    @PostMapping("/authenticate/login")
    ResponseEntity<?> logIn(@RequestBody User user) ;
}
