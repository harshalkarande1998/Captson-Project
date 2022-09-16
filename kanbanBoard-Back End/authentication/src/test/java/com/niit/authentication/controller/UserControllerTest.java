package com.niit.authentication.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.authentication.domain.User;
import static org.mockito.internal.verification.VerificationModeFactory.times;

import com.niit.authentication.security.JwtTokenGenerator;
import com.niit.authentication.service.UserService;
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


import java.util.HashMap;

import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;
    private User user1, user2;

    @Mock
    private JwtTokenGenerator jwtTokenGenerator;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() throws Exception{
        user1 = new User("hkarande98@gmail.com","Harshal@123");
        user2 = new User("hrs_kanban_project_group_2@gmail.com","HRSKanbanProject@2");

        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

    }

    @AfterEach
    public void tearDown(){
        user1=null;
        user2=null;
    }

    private static String jsonToString(final Object ob) throws JsonProcessingException {
        String result;

        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(ob);
            result = jsonContent;
        } catch(JsonProcessingException e) {
            result = "JSON processing error";
        }

        return result;
    }

    @Test
    public void givenUserRegisteredSuccessfully() throws Exception {
        when(userService.registerUser(any())).thenReturn(user1);
        mockMvc.perform(post("/authenticate/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(user1))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).registerUser(user1);

    }

    @Test
    public void givenUserRegisteredSuccessfullyWithAnotherUser() throws Exception {
        when(userService.registerUser(any())).thenReturn(user2);
        mockMvc.perform(post("/authenticate/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(user2))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).registerUser(user2);
    }

    @Test
    public void isTokenGeneratorMethodCalling() throws Exception {
        when(userService.findByEmailAndPassword(user1.getEmail(),user1.getPassword())).thenReturn(user1);
        when(jwtTokenGenerator.generateToken(user1)).thenReturn(new HashMap<>());
        mockMvc.perform(post("/authenticate/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(user1))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).findByEmailAndPassword(user1.getEmail(),user1.getPassword());
        verify(jwtTokenGenerator,times(1)).generateToken(user1);
    }

}


