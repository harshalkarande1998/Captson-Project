package com.niit.boards;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.boards.controller.BoardController;
import com.niit.boards.exceptions.BoardAlreadyExistsException;
import com.niit.boards.exceptions.InvalidUserException;
import com.niit.boards.exceptions.UserNotFoundException;
import com.niit.boards.model.*;
import com.niit.boards.proxy.BoardProxy;
import com.niit.boards.services.BoardService;
import io.jsonwebtoken.Claims;
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

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@ExtendWith(MockitoExtension.class)
public class BoardControllerTest {
    @Mock
    BoardService service;

    @InjectMocks
    BoardController controller;

    @Autowired
    MockMvc mockMvc;

    Board board;

    List<Rule> rules;

    List<Column> columns;

    List<Member> members;

    List<Task> tasks;

    List<String> taskStatusAvailable;

    List<String> taskPriorityAvailable;

    Claims claims;
    HttpServletRequest request;
    @BeforeEach
    public void setup()
    {
        Instant instant = Instant.parse("2022-08-28T10:00:00.00Z");
        Date deadline = Date.from(instant);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        tasks = new ArrayList<>();

        tasks.add(new Task(1,"task1","test task 1", "",
                false,"in progress","high","test@email.com",deadline));

        columns= new ArrayList<>();
        columns.add(new Column(1,"column 1",5,tasks));

        members = new ArrayList<>();
        members.add(new Member("test@email.com","admin"));

        taskStatusAvailable = new ArrayList<>();
        taskStatusAvailable.add("in progress");

        taskPriorityAvailable = new ArrayList<>();
        taskPriorityAvailable.add("high");

        rules = new ArrayList<>();
        board = new Board(1,"test board","testing purpose only",
                taskStatusAvailable,taskPriorityAvailable ,rules ,columns ,members);

        claims = new Claims() {
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
                return "test@email.com";
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


    }
    @AfterEach
    public void tearDown()
    {
        mockMvc = null;

        board = null;

        rules = null;

        columns = null;

        members = null;

        tasks = null;

        taskStatusAvailable = null;

        taskPriorityAvailable = null;

        claims = null;
    }

    @Test
    public void addNewBoardSuccessfully() throws Exception {

        when(service.addBoard(eq(board),eq("test@email.com"), any())).thenReturn(true);
        mockMvc.perform(post("/boards/addBoard/test@email.com").contentType(MediaType.APPLICATION_JSON).
                content(getJsonString(board)).requestAttr("claims",claims)).andDo(MockMvcResultHandlers.print());
        verify(service, times(1)).addBoard(eq(board),eq("test@email.com"), any());
    }

    @Test
    public void updateExistingBoardSuccessfully() throws Exception {

        when(service.updateBoard(eq(board),eq("test@email.com"))).thenReturn(true);
        mockMvc.perform(put("/boards/updateBoard/test@email.com").contentType(MediaType.APPLICATION_JSON).
                content(getJsonString(board)).requestAttr("claims",claims)).andDo(MockMvcResultHandlers.print());
        verify(service, times(1)).updateBoard(eq(board),eq("test@email.com"));
    }

    @Test
    public void deleteExistingBoardSuccessfully() throws Exception {

        when(service.deleteBoard(eq(1),eq("test@email.com"), any())).thenReturn(true);
        mockMvc.perform(delete("/boards/deleteBoard/test@email.com/1").requestAttr("claims",claims)).andDo(MockMvcResultHandlers.print());
        verify(service, times(1)).deleteBoard(eq(1),eq("test@email.com"), any());
    }

    @Test
    public void getExistingBoardsSuccessfully() throws Exception {

        when(service.getBoard(eq(board.getBoardId()),eq("test@email.com"))).thenReturn(board);
        mockMvc.perform(get("/boards/getBoard/test@email.com/1")).andDo(MockMvcResultHandlers.print());
        verify(service, times(1)).getBoard(eq(board.getBoardId()),eq("test@email.com"));
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
