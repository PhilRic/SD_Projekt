import { Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { BearbeitungsService } from 'src/app/bearbeitungs.service';

@Component({
  selector: 'app-servo',
  templateUrl: './servo.component.html',
  styleUrls: ['./servo.component.css', '../components.css']
})
export class ServoComponent implements OnInit, OnDestroy {
  
  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  @Input() raumname: string | any;
  @Input() referenz:  | any;
  devices: any;
  status: string = 'unknown';
  sliderValue = 0;
  background: string = 'lightgrey';

  constructor(private webSocketService: WebSocketServiceService, public BearbeitungsService: BearbeitungsService) {}

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

  getbearbeiten() {
    return this.BearbeitungsService.showLoeschen
  }

  onChange(){
    this.webSocketService.sendMessage(`{"payload":${this.sliderValue},"topic":"${this.device_id}"}`);
  }

  deleteClicked(){
    const devices_einlesen = localStorage.getItem(this.raumname);
    console.log(this.raumname);

    if (devices_einlesen) {
    this.devices = JSON.parse(devices_einlesen);}
    console.log(this.devices);

    const deviceIDToRemove = this.device_id;
    const filteredDevices = this.devices.filter((device: { device_id: string | undefined; }) => device.device_id !== deviceIDToRemove);
    console.log(this.devices);
    
    localStorage.setItem(this.raumname, JSON.stringify(filteredDevices));
    const componentRef: ComponentRef<ServoComponent> = 
    this.referenz.destroy();
  }

}
