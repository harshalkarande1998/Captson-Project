package com.niit.googlelogin.repository;

import com.niit.googlelogin.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepos extends MongoRepository<User,String> {
}
