import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';


@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit, OnDestroy {
  tempAkt: number | undefined;
  zielTemp: number | undefined;
  status: string = 'unknown';
  wasserfall_isChecked = false;
  poolbeleuchtung_isChecked = false;

  constructor(private webSocketService: WebSocketServiceService) {}

  ngOnInit() {
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
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
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  sendMessage() {
    this.webSocketService.sendMessage('test');
  }

  onToggleChange() {
    const payload = this.wasserfall_isChecked ? 'true' : 'false';
    this.webSocketService.sendMessage(`{"payload":"${payload}","topic":"wasserfall"}`);
  }
}
