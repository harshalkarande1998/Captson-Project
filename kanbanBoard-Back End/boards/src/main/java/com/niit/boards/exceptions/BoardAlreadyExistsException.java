package com.niit.boards.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "The board already exists, please use update")
public class BoardAlreadyExistsException extends Exception {
}
