package com.niit.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "The user is already added to the board")
public class BoardAlreadyExistsException extends Exception {
}
