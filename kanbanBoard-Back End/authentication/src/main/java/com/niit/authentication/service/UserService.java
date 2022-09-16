package com.niit.authentication.service;

import com.niit.authentication.domain.User;
import com.niit.authentication.exception.UserAlreadyFoundException;
import org.apache.http.auth.InvalidCredentialsException;

public interface UserService {

    User findByEmailAndPassword(String email, String password) throws InvalidCredentialsException;
    User registerUser(User user) throws UserAlreadyFoundException;

}
