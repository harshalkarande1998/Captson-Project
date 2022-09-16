package com.niit.user.repository;

import com.niit.user.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepos extends MongoRepository<User, String> {
}
