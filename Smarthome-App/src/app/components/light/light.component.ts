import { Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { BearbeitungsService } from 'src/app/bearbeitungs.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css', '../components.css']
})
export class LightComponent implements OnInit, OnDestroy {
  
  @Input() device_id: string | any;
  @Input() name: string | any;
  @Input() raumname: string | any;
  @Input() referenz:  | any;
  status: string = 'unknown';
  lamp_is_checked = false;
  backgroundLight: string = 'lightgrey';
  devices: any;

  constructor(private webSocketService: WebSocketServiceService, public BearbeitungsService: BearbeitungsService) {}

  ngOnInit() {
    if (this.name == "") {
      this.name = "Light without Name";
    }

    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      if (data.topic === this.device_id) {
        this.lamp_is_checked = data.payload;
        this.changeBackground();
      } 
    });
  }

  getbearbeiten() {
    return this.BearbeitungsService.showLoeschen
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }


  onToggleChange() {
    this.changeBackground();
    const payload = this.lamp_is_checked ? 'true' : 'false';
    this.webSocketService.sendMessage(`{"payload":${payload},"topic":"${this.device_id}"}`);
  }

  changeBackground() {
    this.backgroundLight = this.lamp_is_checked ? 'gold' : 'lightgrey';
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
    const componentRef: ComponentRef<LightComponent> = 
    this.referenz.destroy();
  }

}
