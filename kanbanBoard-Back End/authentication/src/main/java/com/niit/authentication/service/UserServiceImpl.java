package com.niit.authentication.service;

import com.niit.authentication.domain.User;
import com.niit.authentication.exception.UserAlreadyFoundException;
import com.niit.authentication.repository.UserRepository;

import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByEmailAndPassword(String email, String password) throws InvalidCredentialsException {
        System.out.println("Before calling repo ************/////////////////****************************-------+++++*");
           User loggedInUser= userRepository.findByEmailAndPassword(email,password);
        if(loggedInUser==null){
            System.out.println("Invalid credential*******************************************************************************");
            throw new InvalidCredentialsException();
        }
        System.out.println("After the calling repo ************************************************************");

        return loggedInUser;

    }

    @Override
    public User registerUser(User user) throws UserAlreadyFoundException {
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyFoundException();
        }

        return userRepository.save(user);
    }
}
