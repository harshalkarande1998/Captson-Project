package com.example.notification;

import com.example.notification.controller.EmailController;
import com.example.notification.model.Email;
import com.example.notification.service.EmailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class EmailControllerTest {
    @Mock
    EmailService service;

    @InjectMocks
    EmailController controller;

    @Autowired
    MockMvc mockMvc;
    Email email;


    @BeforeEach

    public void setup()
    {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        email = new Email("testUser@email.com","test","test","test");

    }
    @AfterEach
    public void tearDown()
    {
        email= null;
        mockMvc=null;
    }



    @Test
    public void ifEmailSend() throws Exception{
        when(service.sendNotification(any())).thenReturn("Mail sent Successfully");
       mockMvc.perform(post("/notifications").contentType(MediaType.APPLICATION_JSON).content(getJsonString(email)))
               .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());

        verify(service,times(1)).sendNotification(email);

    }

    public static String getJsonString(final Object ob) throws JsonProcessingException {
        String result;
        try{
            ObjectMapper mapper =  new ObjectMapper();
            result = mapper.writeValueAsString(ob);
        }
        catch(JsonProcessingException je)
        {
            result="Unable to process object";
        }
        return result;
    }
}
