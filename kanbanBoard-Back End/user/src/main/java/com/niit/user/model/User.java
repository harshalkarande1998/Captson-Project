package com.niit.user.model;

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
    //the user email id
    private String email;
    // the user password
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    // All the boards the user is in
    private List<Integer> boards;

}
