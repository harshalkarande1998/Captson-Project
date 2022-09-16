package com.niit.boards.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "only members of board can access")

public class UnauthorizedAccessException extends Exception {
}
