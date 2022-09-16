package com.niit.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.discovery.converters.Auto;
import com.niit.user.controller.UserController;
import com.niit.user.exceptions.UserAlreadyExistsException;
import com.niit.user.model.User;
import com.niit.user.services.UserService;
import io.jsonwebtoken.Claims;
import org.aspectj.lang.annotation.Before;
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
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @Mock
    UserService service;

    @InjectMocks
    UserController controller;

    @Autowired
    MockMvc mockMvc;
    User user;

    List<Integer> boards;
    @BeforeEach
    public void setup()
    {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        boards = Arrays.asList(1,2,3,4,5);
        user = new User("testUser@email.com","test1234","test","user","1234567890",boards);
    }
    @AfterEach
    public void tearDown()
    {
        user= null;
        mockMvc=null;
    }

    @Test
    public void ifNewUserRegisterSuccessfully() throws Exception {
        when(service.register(any())).thenReturn(true);
        mockMvc.perform(post("/user/register").contentType(MediaType.APPLICATION_JSON).characterEncoding("UTF-8")
                .content(getJsonString(user))).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
        verify(service,times(1)).register(user);
    }

    @Test
    public void ifUserExistsAddBoardSuccessfully() throws Exception
    {
        when(service.addBoard(6,"testUser@email.com")).thenReturn(true);
        //used to set claim subject as user email
        Claims claims = new Claims() {
            @Override
            public String getIssuer() {
                return null;
            }

            @Override
            public Claims setIssuer(String s) {
                return null;
            }

            @Override
            public String getSubject() {
                return "testUser@email.com";
            }

            @Override
            public Claims setSubject(String s) {
                return null;
            }

            @Override
            public String getAudience() {
                return null;
            }

            @Override
            public Claims setAudience(String s) {
                return null;
            }

            @Override
            public Date getExpiration() {
                return null;
            }

            @Override
            public Claims setExpiration(Date date) {
                return null;
            }

            @Override
            public Date getNotBefore() {
                return null;
            }

            @Override
            public Claims setNotBefore(Date date) {
                return null;
            }

            @Override
            public Date getIssuedAt() {
                return null;
            }

            @Override
            public Claims setIssuedAt(Date date) {
                return null;
            }

            @Override
            public String getId() {
                return null;
            }

            @Override
            public Claims setId(String s) {
                return null;
            }

            @Override
            public <T> T get(String s, Class<T> aClass) {
                return null;
            }

            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean containsKey(Object key) {
                return false;
            }

            @Override
            public boolean containsValue(Object value) {
                return false;
            }

            @Override
            public Object get(Object key) {
                return null;
            }

            @Override
            public Object put(String key, Object value) {
                return null;
            }

            @Override
            public Object remove(Object key) {
                return null;
            }

            @Override
            public void putAll(Map<? extends String, ?> m) {

            }

            @Override
            public void clear() {

            }

            @Override
            public Set<String> keySet() {
                return null;
            }

            @Override
            public Collection<Object> values() {
                return null;
            }

            @Override
            public Set<Entry<String, Object>> entrySet() {
                return null;
            }
        };
        mockMvc.perform(put("/user/board/addBoard/testUser@email.com/6").requestAttr("claims",claims)).andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());
        verify(service,times(1)).addBoard(6,"testUser@email.com");
    }
    @Test
    public void ifUserAndBoardExistDeleteSuccessfully() throws Exception
    {
        when(service.deleteBoard(6,"testUser@email.com")).thenReturn(true);
        Claims claims = new Claims() {
            @Override
            public String getIssuer() {
                return null;
            }

            @Override
            public Claims setIssuer(String s) {
                return null;
            }

            @Override
            public String getSubject() {
                return "testUser@email.com";
            }

            @Override
            public Claims setSubject(String s) {
                return null;
            }

            @Override
            public String getAudience() {
                return null;
            }

            @Override
            public Claims setAudience(String s) {
                return null;
            }

            @Override
            public Date getExpiration() {
                return null;
            }

            @Override
            public Claims setExpiration(Date date) {
                return null;
            }

            @Override
            public Date getNotBefore() {
                return null;
            }

            @Override
            public Claims setNotBefore(Date date) {
                return null;
            }

            @Override
            public Date getIssuedAt() {
                return null;
            }

            @Override
            public Claims setIssuedAt(Date date) {
                return null;
            }

            @Override
            public String getId() {
                return null;
            }

            @Override
            public Claims setId(String s) {
                return null;
            }

            @Override
            public <T> T get(String s, Class<T> aClass) {
                return null;
            }

            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean containsKey(Object key) {
                return false;
            }

            @Override
            public boolean containsValue(Object value) {
                return false;
            }

            @Override
            public Object get(Object key) {
                return null;
            }

            @Override
            public Object put(String key, Object value) {
                return null;
            }

            @Override
            public Object remove(Object key) {
                return null;
            }

            @Override
            public void putAll(Map<? extends String, ?> m) {

            }

            @Override
            public void clear() {

            }

            @Override
            public Set<String> keySet() {
                return null;
            }

            @Override
            public Collection<Object> values() {
                return null;
            }

            @Override
            public Set<Entry<String, Object>> entrySet() {
                return null;
            }
        };
        mockMvc.perform(delete("/user/board/deleteBoard/testUser@email.com/6").requestAttr("claims",claims)).andExpect(status().isOk()).andDo(
                MockMvcResultHandlers.print()
        );
        verify(service,times(1)).deleteBoard(6,"testUser@email.com");

    }
    @Test
    public void ifUserExistGetAllBoards() throws Exception
    {
        when(service.getAllBoards("testUser@email.com")).thenReturn(boards);
        Claims claims = new Claims() {
            @Override
            public String getIssuer() {
                return null;
            }

            @Override
            public Claims setIssuer(String s) {
                return null;
            }

            @Override
            public String getSubject() {
                return "testUser@email.com";
            }

            @Override
            public Claims setSubject(String s) {
                return null;
            }

            @Override
            public String getAudience() {
                return null;
            }

            @Override
            public Claims setAudience(String s) {
                return null;
            }

            @Override
            public Date getExpiration() {
                return null;
            }

            @Override
            public Claims setExpiration(Date date) {
                return null;
            }

            @Override
            public Date getNotBefore() {
                return null;
            }

            @Override
            public Claims setNotBefore(Date date) {
                return null;
            }

            @Override
            public Date getIssuedAt() {
                return null;
            }

            @Override
            public Claims setIssuedAt(Date date) {
                return null;
            }

            @Override
            public String getId() {
                return null;
            }

            @Override
            public Claims setId(String s) {
                return null;
            }

            @Override
            public <T> T get(String s, Class<T> aClass) {
                return null;
            }

            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean containsKey(Object key) {
                return false;
            }

            @Override
            public boolean containsValue(Object value) {
                return false;
            }

            @Override
            public Object get(Object key) {
                return null;
            }

            @Override
            public Object put(String key, Object value) {
                return null;
            }

            @Override
            public Object remove(Object key) {
                return null;
            }

            @Override
            public void putAll(Map<? extends String, ?> m) {

            }

            @Override
            public void clear() {

            }

            @Override
            public Set<String> keySet() {
                return null;
            }

            @Override
            public Collection<Object> values() {
                return null;
            }

            @Override
            public Set<Entry<String, Object>> entrySet() {
                return null;
            }
        };
        mockMvc.perform(get("/user/board/all/testUser@email.com").requestAttr("claims",claims)).andExpect(status().isOk()).andDo(
                MockMvcResultHandlers.print()
        );
        verify(service,times(1)).getAllBoards("testUser@email.com");

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
