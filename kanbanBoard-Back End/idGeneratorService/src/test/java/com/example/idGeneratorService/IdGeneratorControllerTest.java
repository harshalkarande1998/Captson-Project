package com.example.idGeneratorService;


import com.example.idGeneratorService.controller.IdGeneratorController;
import com.example.idGeneratorService.model.IdGenerator;
import com.example.idGeneratorService.service.IdGeneratorImpl;
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

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class IdGeneratorControllerTest {
    @Mock
    IdGeneratorImpl service;

    @InjectMocks
    IdGeneratorController controller;

    @Autowired
    MockMvc mockMvc;
    IdGenerator idgenerator;



    @BeforeEach

    public void setup()
    {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        idgenerator = new IdGenerator("qwerty");

    }
    @AfterEach
    public void tearDown()
    {
        idgenerator= null;
        mockMvc=null;
    }

    @Test
    public void ifNumGenerated() throws Exception{
        when(service.retrivedIdNum(any())).thenReturn(idgenerator);
        mockMvc.perform(post("/generate").contentType(MediaType.APPLICATION_JSON).content(getJsonString(idgenerator)))
                .andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());

        verify(service,times(1)).retrivedIdNum(idgenerator);
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
