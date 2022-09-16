package com.example.notification.controller;



import com.example.notification.exception.InvalidEmailAddressException;
import com.example.notification.model.Email;
import com.example.notification.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController

public class EmailController {

    @Autowired private EmailService emailService;


    @PostMapping("/notifications")
    public String sendNotification(
            @RequestBody Email details) throws InvalidEmailAddressException {
        String status
                = emailService.sendNotification(details);

        return status;
    }
}
