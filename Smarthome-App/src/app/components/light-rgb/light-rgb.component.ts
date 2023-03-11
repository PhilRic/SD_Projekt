import { Component, ComponentRef, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { BearbeitungsService } from 'src/app/bearbeitungs.service';

@Component({
  selector: 'app-light-rgb',
  templateUrl: './light-rgb.component.html',
  styleUrls: ['./light-rgb.component.css', '../components.css']
})
export class LightRgbComponent implements OnInit , OnDestroy{
  
  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  @Input() raumname: string | any;
  @Input() referenz:  | any;
  devices: any;
  selectedColor = '#ff0000';
  status: string = 'unknown';
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
        
      } 
    });
  }

  getbearbeiten() {
    return this.BearbeitungsService.showLoeschen
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  

  onColorChange(color: string) {
    console.log(color);
    this.webSocketService.sendMessage(`{"payload":"${color}","topic":"${this.device_id}"}`);
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
    const componentRef: ComponentRef<LightRgbComponent> = 
    this.referenz.destroy();
  }

}