package com.niit.googlelogin.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class User {
    @Id
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private List<Integer> boards;


}
