package com.example.notification.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST,reason = "Invalid recipient Email Address.Try with valid Email")
public class InvalidEmailAddressException extends Exception{
}
