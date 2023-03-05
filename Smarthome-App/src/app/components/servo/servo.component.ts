import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';

@Component({
  selector: 'app-servo',
  templateUrl: './servo.component.html',
  styleUrls: ['./servo.component.css', '../components.css']
})
export class ServoComponent implements OnInit, OnDestroy {
  
  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  status: string = 'unknown';
  sliderValue = 0;
  background: string = 'lightgrey';
  

  constructor(private webSocketService: WebSocketServiceService) {}

  ngOnInit() {
    if (this.name == "") {
      this.name = "Servo without Name";
    }

    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      if (data.topic === this.device_id) {
        this.sliderValue = data.payload;
      } 
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  

  onChange(){
    this.webSocketService.sendMessage(`{"payload":${this.sliderValue},"topic":"${this.device_id}"}`);
  }

}
