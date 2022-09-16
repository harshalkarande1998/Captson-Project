package com.niit.googlelogin.controller;

import com.niit.googlelogin.exception.UserAlreadyExistsException;
import com.niit.googlelogin.model.User;
import com.niit.googlelogin.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/googleLogin")
public class UserController {
    UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerWithGoogle(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            Map<String, String> userToken =  service.loginUserWithGoogle(user);
            if(userToken==null)
                throw new Exception();
           return new ResponseEntity<>(userToken,HttpStatus.OK);
        } catch (UserAlreadyExistsException e) {
            throw e;
        } catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
