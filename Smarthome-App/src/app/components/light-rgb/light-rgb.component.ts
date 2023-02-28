import { Component, Input, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';

@Component({
  selector: 'app-light-rgb',
  templateUrl: './light-rgb.component.html',
  styleUrls: ['./light-rgb.component.css']
})
export class LightRgbComponent implements OnInit {

  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  status: string = 'unknown';
  lamp_is_checked = false;
  background: string = 'lightgrey';

  constructor(private webSocketService: WebSocketServiceService) { }

  ngOnInit(): void {
    const host = '';
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

}
