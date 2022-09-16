package com.niit.googlelogin.services;

import com.niit.googlelogin.exception.UserAlreadyExistsException;
import com.niit.googlelogin.model.User;

import java.util.Map;

public interface UserService {
    Map<String, String> loginUserWithGoogle(User user) throws UserAlreadyExistsException;
    String generatePassword();
}
