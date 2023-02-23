import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, OnDestroy{
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
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

}


