package com.niit.authentication.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import com.niit.authentication.domain.User;
import com.niit.authentication.exception.UserAlreadyFoundException;
import com.niit.authentication.security.JwtTokenGenerator;
import com.niit.authentication.service.UserService;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/authenticate")
public class UserController {

        private UserService userService;
        private JwtTokenGenerator jwtTokenGenerator;


    @Autowired
    public UserController(UserService userService, JwtTokenGenerator jwtTokenGenerator) {
        this.userService = userService;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    @PostMapping("/register")
    @HystrixCommand(fallbackMethod = "fallbackRegister", commandKey = "registerKey",groupKey = "register",
            commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "10000")
            },
            ignoreExceptions = {
            UserAlreadyFoundException.class
    })
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyFoundException {
        userService.registerUser(user);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.CREATED);
    }


    @PostMapping("/login")
    @HystrixCommand(fallbackMethod = "fallbackLogin", commandKey = "loginKey",groupKey = "login",
            commandProperties ={
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "10000")
            } ,
            ignoreExceptions = {
            InvalidCredentialsException.class
    })
    public ResponseEntity<?> logIn(@RequestBody User user) throws InvalidCredentialsException{
        User logInUser = userService.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if(logInUser==null){
            throw new InvalidCredentialsException();
        }
        System.out.println("token is generating**********************************************************************************************************************************************************************************************");
        Map<String, String> generatedToken= jwtTokenGenerator.generateToken(user);
        System.out.println("token is generated**************************************************/****************************************222");
        return new ResponseEntity<>(generatedToken, HttpStatus.OK);
    }


    public ResponseEntity<?> fallbackRegister(@RequestBody User user) throws UserAlreadyFoundException{

        String message = "Registration failed";
        return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);

    }

    public ResponseEntity<?> fallbackLogin(@RequestBody User user) throws UserAlreadyFoundException{

        String message = "Login failed";
        return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);

    }
}
