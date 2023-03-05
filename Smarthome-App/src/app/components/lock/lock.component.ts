import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css', '../components.css']
})
export class LockComponent implements OnInit {

  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  status: string = 'unknown';
  background: string = 'lightgrey';
  locked = false;

  constructor(private webSocketService: WebSocketServiceService) { }

  ngOnInit(): void {
    if (this.name == "") {
      this.name = "Lock without Name";
    }

    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

  buttonClicked() {
    console.log("Button geklickt");
    this.webSocketService.sendMessage(`{"payload": true,"topic":"${this.device_id}"}`);
  }

}
