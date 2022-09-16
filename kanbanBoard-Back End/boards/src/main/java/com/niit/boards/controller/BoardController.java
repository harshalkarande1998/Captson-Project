package com.niit.boards.controller;

import com.niit.boards.exceptions.*;
import com.niit.boards.model.Board;
import com.niit.boards.services.BoardService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/boards")
public class BoardController {
    BoardService service;

    @Autowired
    public BoardController(BoardService service) {
        this.service = service;
    }

    @PostMapping("/addBoard/{email}")
    public ResponseEntity<?> addNewBoard(@RequestBody Board board, @PathVariable String email, HttpServletRequest request)
            throws BoardAlreadyExistsException, UserNotFoundException, InvalidUserException
    {
        Claims claims = (Claims) request.getAttribute("claims");
        if(!claims.getSubject().equalsIgnoreCase(email))
            throw new InvalidUserException();
        try
        {
            return new ResponseEntity<>(service.addBoard(board, email, request),HttpStatus.CREATED);
        }
        catch(BoardAlreadyExistsException | UserNotFoundException | InvalidUserException be)
        {
            throw be;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateBoard/{email}")
    public ResponseEntity<?> updateBoard(@RequestBody Board board, @PathVariable String email) throws BoardNotExistException
    {

        try{
           return new ResponseEntity<>(service.updateBoard(board, email), HttpStatus.OK);
        }
        catch(BoardNotExistException be)
        {
            throw be;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/deleteBoard/{email}/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable String email, @PathVariable int boardId,
                                         HttpServletRequest request) throws
            BoardNotExistException,UnauthorizedDeletionException {
        try{
            return new ResponseEntity<>(service.deleteBoard(boardId,email, request), HttpStatus.OK);
        }
        catch(BoardNotExistException | UnauthorizedDeletionException be)
        {
            throw be;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getBoard/{email}/{boardId}")
    public ResponseEntity<?> getBoard(@PathVariable String email, @PathVariable int boardId)throws
            BoardNotExistException,UnauthorizedAccessException {
        try{
            return new ResponseEntity<>(service.getBoard(boardId,email), HttpStatus.OK);
        }
        catch(BoardNotExistException | UnauthorizedAccessException be)
        {
            throw be;
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
