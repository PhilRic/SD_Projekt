import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css']
})
export class MotorComponent implements OnInit {

  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  status: string = 'unknown';
  background: string = 'lightgrey';

  constructor(private webSocketService: WebSocketServiceService) { }

  ngOnInit(): void {
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
