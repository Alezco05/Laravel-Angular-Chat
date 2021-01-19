import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Echo from 'laravel-echo';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMessage(message: string, socketsID) {
    const url = `${environment.urlBase}/api/message/send`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${ localStorage.getItem('token') }`,
      'X-Socket-ID': socketsID
    });
    const data = {
      message
    };

    return this.http.post(url, data, {headers});
  }

  sendDirectMessage(message: string, to: number, socketsID) {
    const url = `${environment.urlBase}/api/message/sendDM`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${ localStorage.getItem('token') }`,
      'X-Socket-ID': socketsID
    });
    const data = {
      message,
      to
    };

    return this.http.post(url, data, {headers});
  }

  getSockets(): Echo{
    return new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      wsHost: environment.pusher_host,
      cluster: environment.pusher_cluster,
      authEndpoint: `${ environment.urlBase }/api/broadcasting/auth`,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
      },
      wsPort: 6001,
      disableStats: true,
      enabledTransports: ['ws']
    });
  }

}
