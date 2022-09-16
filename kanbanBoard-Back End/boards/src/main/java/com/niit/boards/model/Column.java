package com.niit.boards.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Column {
    @Id
    private int columnId;
    private String columnTitle;
    //The maximum number of allowed tasks in the column
    private int columnTaskLimit;
    // The list of tasks in the column
    private List<Task> tasks;
}
