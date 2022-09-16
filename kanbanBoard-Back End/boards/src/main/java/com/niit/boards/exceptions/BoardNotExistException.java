package com.niit.boards.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "The board cannot be found")
public class BoardNotExistException extends Exception {
}
