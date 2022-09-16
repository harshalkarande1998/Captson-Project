package com.niit.boards.services;

import com.niit.boards.exceptions.*;
import com.niit.boards.model.Board;

import javax.servlet.http.HttpServletRequest;

public interface BoardService {
    // If a board already exists, then only members can modify the board


    boolean addBoard(Board board, String email, HttpServletRequest request) throws BoardAlreadyExistsException, UserNotFoundException, InvalidUserException;

    boolean updateBoard(Board board, String email) throws BoardNotExistException, UnauthorizedAccessException;
    // Only the board admin can delete the board
    boolean deleteBoard(int boardId, String email, HttpServletRequest request) throws BoardNotExistException,
            UnauthorizedDeletionException,
            UserNotFoundException;
    // only members of a board can access the board
    Board getBoard(int boardId, String email) throws BoardNotExistException, UnauthorizedAccessException;

}
