import { Component } from '@angular/core';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent {
  private webSocket!: WebSocket;
  tempAkt: number | undefined;
  zielTemp: number | undefined;
  status: string = 'unknown';

  wasserfall_isChecked = false;
  poolbeleuchtung_isChecked = false;



  ngOnInit() {
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocket = new WebSocket(host);
    this.webSocket.onopen = () => {
      console.log('connected');
      this.status = 'connected';
    };
    this.webSocket.onclose = () => {
      console.log('disconnected');
      this.status = 'not connected';
      setTimeout(() => this.ngOnInit(), 3000);
    };
    this.webSocket.onmessage = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);
      console.log('received', data);
      if (data.topic === 'temp_akt') {
        this.tempAkt = data.payload;
      } 
      if (data.topic === 'zieltemp') {
        this.zielTemp = data.payload;
      }
      if (data.topic === 'wasserfall') {
        this.wasserfall_isChecked = data.payload;
      }
      
      
    };
  }

//Zerstöre den Socket, wenn die App beendet wird.
  ngOnDestroy() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }

//Nachricht über Socket an Node Red versenden

  sendMessage() {
    if (this.webSocket) {
      this.webSocket.send('test');
    }
  }

  onToggleChange() {
    if (this.wasserfall_isChecked) {
      this.webSocket.send(`{"payload":"true","topic":"wasserfall"}`); //Für Variablen Werte`{"payload":"${payload}","topic":"mein Topic"}`
    } else {
      this.webSocket.send(`{"payload":"false","topic":"wasserfall"}`); 
    }
  }

}