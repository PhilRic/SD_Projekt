import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, OnDestroy{
  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  temperatur: number | undefined;
  status: string = 'unknown';
  

  constructor(private webSocketService: WebSocketServiceService) {}

  ngOnInit() {
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      if (data.topic === this.device_id) {
        this.temperatur = data.payload;
      } 
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

}


