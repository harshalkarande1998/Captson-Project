import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoardComponent } from './board/board.component';
import { ColumnsComponent } from './columns/columns.component';
import { TaskComponent } from './task/task.component';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialExampleModule } from 'material-example.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { AddColumnPopUpComponent } from './board/add-column-pop-up/add-column-pop-up.component';
import { AddNewBoardPopupComponent } from './add-new-board-popup/add-new-board-popup.component'
import { AddTaskPopupComponent } from './columns/add-task-popup/add-task-popup.component';
import { RulePopUpComponent } from './board/rule-pop-up/rule-pop-up.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';
import { AddMembersComponent } from './board/add-members/add-members.component';
import { TaskPriorityComponent } from './board/task-priority/task-priority.component';
import { UpdateColumnPopupComponent } from './columns/update-column-popup/update-column-popup.component';
import { TaskStatusComponent } from './board/task-status/task-status.component';
import { RuleUpdateComponent } from './board/rule-update/rule-update.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    BoardComponent,
    ColumnsComponent,
    TaskComponent,
    NavbarComponent,
    SidebarComponent,
    AddColumnPopUpComponent,
    AddNewBoardPopupComponent,
    AddTaskPopupComponent,
    RulePopUpComponent,
    UpdateTaskComponent,
    AddMembersComponent,
    TaskPriorityComponent,
    UpdateColumnPopupComponent,
    TaskStatusComponent,
    RuleUpdateComponent,
    ChatbotComponent,
    ContactComponent,
    HelpComponent,
    ProfileComponent,



  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule
  ]
  ,
  exports: [
    BoardComponent,
    ColumnsComponent,
    TaskComponent,
    NavbarComponent,
    SidebarComponent,
    DragDropModule,
    AddColumnPopUpComponent,
    AddNewBoardPopupComponent,
    AddTaskPopupComponent,
    RulePopUpComponent,
    UpdateTaskComponent,
    AddMembersComponent,
    TaskPriorityComponent,
    TaskStatusComponent,
    RuleUpdateComponent,
    ChatbotComponent,
    ContactComponent,
    HelpComponent,
    ProfileComponent,
 
  ]
})
export class DashboardModule { }
