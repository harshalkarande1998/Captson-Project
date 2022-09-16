package com.niit.boards.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Board {
    @Id
    private int boardId;
    private String boardName;
    private String boardDescription;
    private List<String> availableTaskStatus;
    private List<String> availableTaskPriority;
    private List<Rule> boardRules;
    private List<Column> columns;
    private List<Member> boardMembers;
}
