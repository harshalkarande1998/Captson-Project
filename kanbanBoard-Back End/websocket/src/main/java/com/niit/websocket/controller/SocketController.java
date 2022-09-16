package com.niit.websocket.controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocketController {

    @MessageMapping("/resume")
    @SendTo("/start/initial")
    public String chat(String msg)
    {
        return msg;
    }
}
