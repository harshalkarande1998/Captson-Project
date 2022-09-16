package com.niit.user.controller;

import com.niit.user.exceptions.*;
import com.niit.user.model.User;
import com.niit.user.services.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException
    {
        try{
            boolean isRegistered = service.register(user);
            return new ResponseEntity<>(isRegistered, HttpStatus.CREATED);
        }catch(UserAlreadyExistsException ue)
        {
            throw ue;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("Some internal server error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/board/addBoard/{email}/{boardId}")
    public ResponseEntity<?> addBoard(@PathVariable String email, @PathVariable int boardId
                                     ) throws UserNotFoundException,
            BoardAlreadyExistsException
//            , InvalidUserException
    {
//        Claims claims = (Claims) request.getAttribute("claims");
//        if(!claims.getSubject().equalsIgnoreCase(email))
//            throw new InvalidUserException();
        try{
            boolean isAdded = service.addBoard(boardId, email);
            return new ResponseEntity<>(isAdded, HttpStatus.CREATED);
        }catch(UserNotFoundException|BoardAlreadyExistsException ue)
        {
            throw ue;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("Some internal server error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/board/deleteBoard/{email}/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable String email, @PathVariable int boardId) throws UserNotFoundException,
            BoardNotExistException
//            , InvalidUserException
    {

//        Claims claims = (Claims) request.getAttribute("claims");
//        if(!claims.getSubject().equalsIgnoreCase(email))
//            throw new InvalidUserException();
        try{
            boolean isDeleted = service.deleteBoard(boardId, email);
            return new ResponseEntity<>(isDeleted, HttpStatus.OK);
        }catch(UserNotFoundException|BoardNotExistException ue)
        {
            throw ue;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("Some internal server error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/board/all/{email}")
    public ResponseEntity<?> getAllBoards(@PathVariable String email, HttpServletRequest request) throws UserNotFoundException,
            InvalidUserException {
        Claims claims = (Claims) request.getAttribute("claims");
        if(!claims.getSubject().equalsIgnoreCase(email))
            throw new InvalidUserException();
        try{
            return  new ResponseEntity<>(service.getAllBoards(email),HttpStatus.OK);
        }catch(UserNotFoundException ue) {
            throw ue;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("Some internal server error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/board/getUserDetails/{email}")
    public ResponseEntity<?> getUserDetails(@PathVariable String email, HttpServletRequest request) throws UserNotFoundException,
            InvalidUserException {
        Claims claims = (Claims) request.getAttribute("claims");
        if(!claims.getSubject().equalsIgnoreCase(email))
            throw new InvalidUserException();
        try{
            return  new ResponseEntity<>(service.getUserDetails(email),HttpStatus.OK);
        }catch(UserNotFoundException ue) {
            throw ue;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("Some internal server error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
