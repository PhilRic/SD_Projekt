import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  private webSocket!: WebSocket;
  status: string = 'unknown';
   hostnew = 'ws://192.168.10.105:1880/ws/simple';

  constructor() {}
 
  public connect(host: string): void {
    this.webSocket = new WebSocket(this.hostnew);
    this.webSocket.onopen = () => {
      console.log('connected');
      this.status = 'connected';
    };
    this.webSocket.onclose = () => {
      console.log('disconnected');
      this.status = 'not connected';
      setTimeout(() => this.connect(this.hostnew), 3000);
    };
  }

  //weiterreichen der Empfangen Daten überall da wo der Socket verwendet wird durch Callback genau dann wann es benötigt wird
  public onMessage(callback: (data: any) => void): void {
    if (this.webSocket) {
      this.webSocket.onmessage = (messageEvent) => {
        const data = JSON.parse(messageEvent.data);
        callback(data);
      };
    }
  }

  public sendMessage(message: string): void {
    if (this.webSocket) {
      this.webSocket.send(message);
    }
  }

  public close(): void {
    if (this.webSocket) {
      this.webSocket.close();
    }
  } 

  }

