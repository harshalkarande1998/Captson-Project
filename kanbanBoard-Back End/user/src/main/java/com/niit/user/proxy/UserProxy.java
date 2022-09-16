package com.niit.user.proxy;

import com.niit.user.exceptions.UserAlreadyExistsException;
import com.niit.user.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "authentication", url = "localhost:8081")
public interface UserProxy {
    @PostMapping("/authenticate/register")
    ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException;
}
