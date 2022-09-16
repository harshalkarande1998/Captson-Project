package com.niit.user.services;

import com.niit.user.exceptions.BoardAlreadyExistsException;
import com.niit.user.exceptions.BoardNotExistException;
import com.niit.user.exceptions.UserAlreadyExistsException;
import com.niit.user.exceptions.UserNotFoundException;
import com.niit.user.model.User;
import com.niit.user.proxy.UserProxy;
import com.niit.user.repository.UserRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    UserRepos repos;
    UserProxy proxy;
    @Autowired
    public UserServiceImpl(UserRepos repos, UserProxy proxy) {
        this.repos = repos;
        this.proxy=proxy;
    }

    @Override
    public boolean register(User user) throws UserAlreadyExistsException {
        if(repos.existsById(user.getEmail()))
            throw new UserAlreadyExistsException();
        ResponseEntity response = proxy.register(user);
        if(response.getStatusCode()== HttpStatus.CREATED) {
            boolean responseValue = (boolean) response.getBody();
            if (responseValue)
                repos.save(user);
        }
        else if (response.getStatusCode()==HttpStatus.CONFLICT) {
                throw new UserAlreadyExistsException();
        }
        return true;
    }

    @Override
    public boolean addBoard(int boardId, String email) throws BoardAlreadyExistsException,UserNotFoundException {
        Optional<User> isUser = repos.findById(email);
        if(isUser.isEmpty())
            throw new UserNotFoundException();
        User user = isUser.get();
        List<Integer> boards = user.getBoards();
        if(boards.contains(boardId))
            throw new BoardAlreadyExistsException();
        boards.add(boardId);
        user.setBoards(boards);
        repos.save(user);
        return true;
    }

    @Override
    public boolean deleteBoard(int boardId, String email) throws BoardNotExistException, UserNotFoundException {
        Optional<User> isUser = repos.findById(email);
        if(isUser.isEmpty())
            throw new UserNotFoundException();
        User user = isUser.get();
        List<Integer> boards = user.getBoards();
        if(!boards.contains(boardId))
            throw new BoardNotExistException();
        boards = boards.stream().filter(b->b!=boardId).collect(Collectors.toList());
        user.setBoards(boards);
        repos.save(user);
        return true;
    }

    @Override
    public List<Integer> getAllBoards(String email) throws UserNotFoundException {
        Optional<User> isUser = repos.findById(email);
        if(isUser.isEmpty())
            throw new UserNotFoundException();
        return isUser.get().getBoards();
    }

    @Override
    public User getUserDetails(String email) throws UserNotFoundException {
        Optional<User> isUser = repos.findById(email);
        if(isUser.isEmpty())
            throw new UserNotFoundException();
        return isUser.get();
    }
}
