package com.example.notification.service;



import com.example.notification.exception.InvalidEmailAddressException;
import com.example.notification.model.Email;

public interface EmailService {




    String sendNotification(Email details) throws InvalidEmailAddressException;
}

