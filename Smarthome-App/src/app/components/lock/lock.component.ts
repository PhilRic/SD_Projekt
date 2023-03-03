import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {

  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  status: string = 'unknown';
  background: string = 'lightgrey';
  locked = false;

  constructor(private webSocketService: WebSocketServiceService) { }

  ngOnInit(): void {
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      if (data.topic === this.device_id) {
        this.locked = data.payload;
      } 
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
