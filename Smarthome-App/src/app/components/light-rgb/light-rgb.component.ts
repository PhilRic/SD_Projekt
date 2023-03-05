import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-light-rgb',
  templateUrl: './light-rgb.component.html',
  styleUrls: ['./light-rgb.component.css', '../components.css']
})
export class LightRgbComponent implements OnInit , OnDestroy{
  
  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  selectedColor = '#ff0000';
  status: string = 'unknown';
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
        
      } 
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  

  onColorChange(color: string) {
    console.log(color);
    this.webSocketService.sendMessage(`{"payload":"${color}","topic":"${this.device_id}"}`);
  }

}