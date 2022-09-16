package com.example.idGeneratorService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class IdGenerator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idNum;

    private String name;

    public IdGenerator(String name){
        this.name=name;
    }


}
