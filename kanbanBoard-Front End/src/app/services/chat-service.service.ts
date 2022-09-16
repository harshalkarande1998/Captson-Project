
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable({
  providedIn:'root'
})
export class ChatServiceService {
  constructor() {}
  conversation = new Subject<Message[]>();
  messageMap = {
    "Hi": "Hello",
    "Who are you": "My name is Kanban Bot",
    "What is your role": "Just guide for the user",
    "Who created you":"I was created by Great Developers",
    "What is kanban board":"It is a tool to help you Organise your work efficiently",
    "How is the weather":"Weather is hot",
    "Why did the spider cross the road":"To get to his website",
    "How do I start working on this board":"You can start by creating a board from sidebar",
    "How can a kanban board help me":"It can help you to keep a track of the tasks you have to do and the tasks that you have done",
    "Can I customise list name":"yes you can",
    "How can I add column":"You can tap on add column button once you created a board",
    "How can I assign task":"You can add task and once you created a task you can assign by selecting task assigned to once you added him as a member",
    
    "defaultmsg": "I can't understand your text. Can you please repeat"
  }
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string){

    let answer:string=""
    // console.log(question);
    
    for(let val in Object.keys(this.messageMap)){
      let msgVal=Object.values(this.messageMap)[val]
      // console.log(msgVal);
      
      if(question.toLowerCase() == Object.keys(this.messageMap)[val].toLowerCase()){
        // console.log(question);
        
        answer= Object.values(this.messageMap)[val];
      }
    }
    
    return answer || this.messageMap['defaultmsg'];
  }
}

// let answer = this.messageMap[question];
    // return answer || this.messageMap['defaultmsg'];