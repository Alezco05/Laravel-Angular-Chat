import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { IUser, IMessage } from '../../intefaces/chat';
import { ChatService } from '../../services/chat.service';
import { scrollTo } from 'scroll-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  echo: Echo;

  inputMessage: string;

  messages: IMessage[] = [];

  userList: IUser[] = [];

  auth: IUser = JSON.parse(localStorage.getItem('user'));

  constructor(
    private chatService: ChatService
  ) {
    this.echo = chatService.getSockets();
   }

  ngOnInit(): void {
    this.echo.private('channel-chat')
        .listen('ChatEvent', (resp) => {
          const message: IMessage = {
            message: resp.message,
            me: false,
            from: resp.from
          };
          this.messages.push(message);
        });

    this.echo.join(`channel-chat`)
    .here((users) => {
      this.userList = users;
    })
    .joining((user) => {
        this.userList.push(user);
    })
    .leaving((user) => {
        this.userList = this.userList.filter((userL) => {
          return user.id !== userL.id;
        });
    });
  }

  sendMessage(){
    const sockets = this.echo.socketId();
    this.chatService.sendMessage(this.inputMessage, sockets)
      .subscribe( (resp: any) => {
        const message: IMessage = {
          message: this.inputMessage,
          me: true,
          from: 'Yo'
        };
        this.inputMessage = '';
        this.messages.push(message);
        this.scrollBottom();
      });
  }

  scrollBottom(){
    const containerScroll = window.document.getElementById('scrollContainer');
    const newTop = containerScroll.scrollHeight;
    scrollTo(containerScroll, {top: newTop});
  }

}
