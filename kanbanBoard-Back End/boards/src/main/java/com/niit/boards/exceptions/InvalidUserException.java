package com.niit.boards.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "The user and token do not match. Invalid token")
public class InvalidUserException extends Exception {
}
