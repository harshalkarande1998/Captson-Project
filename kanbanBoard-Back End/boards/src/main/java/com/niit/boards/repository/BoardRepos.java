package com.niit.boards.repository;

import com.niit.boards.model.Board;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BoardRepos extends MongoRepository<Board, Integer> {
}
