package com.niit.user.services;

import com.niit.user.exceptions.BoardAlreadyExistsException;
import com.niit.user.exceptions.BoardNotExistException;
import com.niit.user.exceptions.UserAlreadyExistsException;
import com.niit.user.exceptions.UserNotFoundException;
import com.niit.user.model.User;

import java.util.List;

public interface UserService {
    boolean register(User user) throws UserAlreadyExistsException;
    boolean addBoard(int boardId, String email) throws BoardAlreadyExistsException, UserNotFoundException;
    boolean deleteBoard(int boardId, String email) throws BoardNotExistException, UserNotFoundException;
    List<Integer> getAllBoards(String email) throws UserNotFoundException;
    User getUserDetails(String email) throws UserNotFoundException;

}
