package com.niit.boards.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rule {
    @Id
    private int ruleId;
    //The column to move task from
    private int fromColumn;
    // The column to move task to
    private int toColumn;
    // The trigger field for task moving(can be task status, completion status, priority etc.)
    private String trigger;
    // The status of the trigger upon which the task will be moved
    private String triggerStatus;

}
