package com.niit.googlelogin.services;

import com.niit.googlelogin.exception.UserAlreadyExistsException;
import com.niit.googlelogin.model.User;
import com.niit.googlelogin.proxy.AuthProxy;
import com.niit.googlelogin.proxy.UserProxy;
import com.niit.googlelogin.repository.UserRepos;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceImpl implements UserService{
     UserRepos repos;
     UserProxy userProxy;
     AuthProxy authProxy;

    @Autowired
    public UserServiceImpl(UserRepos repos, UserProxy userProxy, AuthProxy authProxy) {
        this.repos = repos;
        this.userProxy = userProxy;
        this.authProxy = authProxy;
    }

    @Override
    public Map<String, String> loginUserWithGoogle(User user) throws UserAlreadyExistsException {
        user.setPassword(generatePassword());
        if(repos.existsById(user.getEmail()))
        {
            User user1=repos.findById(user.getEmail()).get();
            System.out.println(user1);
            ResponseEntity authResponse= authProxy.logIn(user1);
            System.out.println(authResponse.getBody());

            return (Map<String, String>) authResponse.getBody();
        } else{
            if(userProxy.register(user).getStatusCode()==HttpStatus.CREATED)
            {
                repos.save(user);
                return (Map<String, String>) authProxy.logIn(repos.save(user));
            }
            else {
                    throw new UserAlreadyExistsException();
            }

        }

//        return null;
    }

    @Override
    public String generatePassword() {
        CharacterRule LCR = new CharacterRule(EnglishCharacterData.LowerCase);
        LCR.setNumberOfCharacters(5);
        CharacterRule UCR = new CharacterRule(EnglishCharacterData.UpperCase);
        UCR.setNumberOfCharacters(2);
        CharacterRule DR = new CharacterRule(EnglishCharacterData.Digit);
        DR.setNumberOfCharacters(3);
        CharacterRule SR = new CharacterRule(EnglishCharacterData.Special);
        SR.setNumberOfCharacters(2);
        PasswordGenerator generate = new PasswordGenerator();
      //  generate.generatePassword(12,LCR);
        return generate.generatePassword(12,LCR,UCR,DR,SR);
    }
}
