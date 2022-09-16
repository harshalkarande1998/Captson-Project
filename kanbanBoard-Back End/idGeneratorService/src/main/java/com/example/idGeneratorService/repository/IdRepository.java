package com.example.idGeneratorService.repository;

import com.example.idGeneratorService.model.IdGenerator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdRepository extends JpaRepository<IdGenerator,Integer> {
}
