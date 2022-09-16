package com.niit.boards.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    private int taskId;
    // Name
    private String taskName;
    // A description on what to do
    private String taskDescription;
    // task image url, if any
    private String taskImage;
    // true if completed, else false
    private boolean taskCompletionStatus;
    // can be on track,in progress etc
    private String taskStatus;
    // can be high, low, etc.
    private String taskPriority;
    //give user emailId
    private String taskAssignedTo;
    //The deadline date for task completion
    private Date dueDate;

}
