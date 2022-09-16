package com.niit.boards.proxy;

import com.niit.boards.exceptions.BoardAlreadyExistsException;
import com.niit.boards.exceptions.BoardNotExistException;
import com.niit.boards.exceptions.InvalidUserException;
import com.niit.boards.exceptions.UserNotFoundException;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.servlet.http.HttpServletRequest;

@FeignClient(name = "user", url = "localhost:8082")
public interface BoardProxy {
    @PutMapping("/user/board/addBoard/{email}/{boardId}")
    public ResponseEntity<?> addBoard(@PathVariable String email, @PathVariable int boardId, @RequestHeader(
            "Authorization") String token)
            throws UserNotFoundException,
            BoardAlreadyExistsException, InvalidUserException;

    @DeleteMapping("/user/board/deleteBoard/{email}/{boardId}")
    ResponseEntity<?> deleteBoard(@PathVariable String email, @PathVariable int boardId, @RequestHeader(
            "Authorization") String token) throws UserNotFoundException,
            BoardNotExistException;

}
