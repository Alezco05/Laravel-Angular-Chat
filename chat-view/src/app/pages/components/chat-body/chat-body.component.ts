import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/intefaces/chat';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styles: [
  ]
})
export class ChatBodyComponent implements OnInit {
  @Input() messages: IMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
