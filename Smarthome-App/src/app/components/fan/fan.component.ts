import { Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { BearbeitungsService } from 'src/app/bearbeitungs.service';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.css', '../components.css']
})
export class FanComponent implements OnInit, OnDestroy {

  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  @Input() raumname: string | any;
  @Input() referenz:  | any;
  devices: any;
  status: string = 'unknown';
  sliderValue = 0;
  background: string = 'lightgrey';
  

  constructor(private webSocketService: WebSocketServiceService, public bearbeitungsservice: BearbeitungsService) {}

  getbearbeiten() {
    return this.bearbeitungsservice.showLoeschen
  }
 
  ngOnInit() {
    if (this.name == "") {
      this.name = "Fan without Name";
    }

    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
    this.webSocketService.onMessage((data) => {
      console.log('received', data);
      if (data.topic === this.device_id) {
        console.log("Topic erkannt");
        this.sliderValue = data.payload;
      } 
    });
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

  

  onSliderChange() {
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
    const componentRef: ComponentRef<FanComponent> = 
    this.referenz.destroy();
  }

}
