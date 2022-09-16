package com.example.idGeneratorService.service;

import com.example.idGeneratorService.model.IdGenerator;
import com.example.idGeneratorService.repository.IdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class IdGeneratorImpl {

    private IdRepository idRepository;

    @Autowired
    public IdGeneratorImpl(IdRepository idRepository){
        this.idRepository=idRepository;
    }



    public IdGenerator retrivedIdNum (IdGenerator idgenerator){

        return idRepository.save(idgenerator);
    }
}
