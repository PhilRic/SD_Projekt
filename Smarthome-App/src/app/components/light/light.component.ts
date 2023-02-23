import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';


@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit, OnDestroy {
  
  @Input() device_id: string | undefined;
  status: string = 'unknown';
  lamp_is_checked = false;
  

  constructor(private webSocketService: WebSocketServiceService) {}

  ngOnInit() {
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      if (data.topic === this.device_id) {
        this.lamp_is_checked = data.payload;
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
    const payload = this.lamp_is_checked ? 'true' : 'false';
    this.webSocketService.sendMessage(`{"payload":"${payload}","topic":"wasserfall"}`);
  }
}
