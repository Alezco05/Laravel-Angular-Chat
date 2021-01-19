import { Component, OnInit, Input } from '@angular/core';
import Echo from 'laravel-echo';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/intefaces/chat';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  @Input() userList: IUser[] = [];
  showM = false;
  userDM: IUser;
  textMessage: string;
  echo: Echo;
  auth: IUser = JSON.parse(localStorage.getItem('user'));

  constructor(private chatService: ChatService, private toastr: ToastrService) {
    this.echo = chatService.getSockets();
  }

  ngOnInit(): void {
    this.getDirectMessage();
  }

  showModal(user: IUser) {
    if (user.id === this.auth.id) {
      return;
    }
    this.showM = true;
    this.userDM = user;
  }

  closeModal() {
    this.showM = false;
  }
  enviarMessage() {
    const socketsID = this.echo.socketId();
    this.closeModal();
    this.chatService.sendDirectMessage(this.textMessage, this.userDM.id, socketsID)
      .subscribe((resp: any) => {
        console.log(resp);
      });
    this.textMessage = '';
  }

  getDirectMessage() {
    this.echo.private(`channel-direct.${this.auth.id}`)
      .listen('DirectMessageEvent', ((resp: any) => {
        this.toastr.success(resp.response.message, `Mensaje de: ${resp.response.from.name}`, {
          timeOut: 10000,
          positionClass: 'toast-top-center'
        });
      }));
  }
}
