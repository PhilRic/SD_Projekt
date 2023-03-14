import { Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { BearbeitungsService } from 'src/app/bearbeitungs.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css', '../components.css']
})
export class TemperatureComponent implements OnInit, OnDestroy{
  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  @Input() raumname: string | any;
  @Input() referenz:  | any;
  temperatur: number | undefined;// = 23;
  status: string = 'unknown';
  backgroundTemp: string = 'lightgrey';
  devices: any;

  constructor(private webSocketService: WebSocketServiceService, public BearbeitungsService: BearbeitungsService) {}

  ngOnInit() {
    if (this.name == "") {
      this.name = "Temperature without Name";
    }

    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.changeBackground();                        // remove later
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      console.log('topic', data.topic);
      console.log('Temp', data.payload.temperature);

      if (data.topic === this.device_id) {
        this.temperatur = data.payload.temperature;
        this.changeBackground();
      } 
    });
  }

  getbearbeiten() {
    return this.BearbeitungsService.showLoeschen
  }

  changeBackground() {
    if (this.temperatur != undefined) {
      if (this.temperatur > 25) {
        this.backgroundTemp = 'darkred';
      }
      else if (this.temperatur > 23 && this.temperatur <= 25) {
        this.backgroundTemp = 'orange';
      }
      else if (this.temperatur > 21 && this.temperatur <= 23) {
        this.backgroundTemp = 'yellow';
      }
      else if (this.temperatur > 19 && this.temperatur <= 21) {
        this.backgroundTemp = '#0a38c4';
      }
      else if (this.temperatur <= 19) {
        this.backgroundTemp = 'darkblue';
      }
    }
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  deleteClicked() {
    const devices_einlesen = localStorage.getItem(this.raumname);
    console.log(this.raumname);

    if (devices_einlesen) {
    this.devices = JSON.parse(devices_einlesen);}
    console.log(this.devices);

    const deviceIDToRemove = this.device_id;
    const filteredDevices = this.devices.filter((device: { device_id: string | undefined; }) => device.device_id !== deviceIDToRemove);
    console.log(this.devices);
    
    localStorage.setItem(this.raumname, JSON.stringify(filteredDevices));
    const componentRef: ComponentRef<TemperatureComponent> = 
    this.referenz.destroy();
  }

}


