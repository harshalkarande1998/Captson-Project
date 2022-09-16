import { Component, OnInit } from '@angular/core';
import { ChatServiceService, Message } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: Message[] = [];
  value!: string;
  constructor(public chatService: ChatServiceService) { }
  ngOnInit() {
      this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }
  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

}
