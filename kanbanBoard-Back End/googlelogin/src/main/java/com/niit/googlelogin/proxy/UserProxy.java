package com.niit.googlelogin.proxy;

import com.niit.googlelogin.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user", url="localhost:8082")
public interface UserProxy {

    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody User user);
}
