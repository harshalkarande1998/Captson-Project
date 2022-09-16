package com.example.idGeneratorService.controller;

import com.example.idGeneratorService.model.IdGenerator;
import com.example.idGeneratorService.service.IdGeneratorImpl;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class IdGeneratorController {

    private IdGeneratorImpl idgenerator;

    @Autowired
    public IdGeneratorController(IdGeneratorImpl idgenerator){
        this.idgenerator=idgenerator;
    }

    @PostMapping("/generate")
    @HystrixCommand(fallbackMethod = "fallbackgetIdNum", commandKey = "getidnumKey",groupKey = "getidnum",
            commandProperties = {
                    @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "10000")
            })
    public ResponseEntity<?> getIdNum(@RequestBody IdGenerator idgenerator1){
//        Thread.sleep(10000);
        return new ResponseEntity<>(idgenerator.retrivedIdNum(idgenerator1).getIdNum(),HttpStatus.CREATED);

    }

    public ResponseEntity<?> fallbackgetIdNum(@RequestBody IdGenerator idgenerator1){
        String message = "Id is not generated.Problem in creating board";
        return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
    }

}
