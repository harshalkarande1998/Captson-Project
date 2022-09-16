package com.example.notification.service;


import java.io.File;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;

import com.example.notification.exception.InvalidEmailAddressException;
import com.example.notification.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service

public class EmailServiceImpl implements EmailService {

    @Autowired private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;




    public String sendNotification(Email email) throws InvalidEmailAddressException {

        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            String mail=email.getRecipient();
            if(mail.contains("@")){
            mimeMessageHelper.setTo(mail);}
            else {
                throw new SendFailedException();
            }
            mimeMessageHelper.setText(email.getMsgBody());
            mimeMessageHelper.setSubject(
                    email.getSubject());


            FileSystemResource file
                    = new FileSystemResource(
                    new File(email.getAttachment()));

            mimeMessageHelper.addAttachment(
                    file.getFilename(), file);


            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        catch (MessagingException e) {
            throw new InvalidEmailAddressException();
        }
    }
}

