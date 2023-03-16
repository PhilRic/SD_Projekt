import { Component, ComponentRef, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import { BearbeitungsService } from 'src/app/bearbeitungs.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css', '../components.css']
})
export class LockComponent implements OnInit {

  @Input() device_id: string | undefined;
  @Input() name: string | undefined;
  @Input() raumname: string | any;
  @Input() referenz:  | any;
  devices: any;
  status: string = 'unknown';
  background: string = 'lightgrey';
  locked = false;

  constructor(private webSocketService: WebSocketServiceService, public BearbeitungsService: BearbeitungsService) { }

  ngOnInit(): void {
    /* Der Komponente wurde kein Name gegeben */
    if (this.name == "") {
      this.name = "Lock without Name";
    }

    /* Verbindung zu NodeRed aufbauen */
    const host = 'ws://raspberrypi.fritz.box:1880/ws/simple';
    this.webSocketService.connect(host);
    this.status = this.webSocketService.status;
  }

  /* abfragen des Bearbeitungsmodus */
  getbearbeiten() {
    return this.BearbeitungsService.showLoeschen
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

  /* Button wurde gedrückt */
  buttonClicked() {
    console.log("Button geklickt");
    this.webSocketService.sendMessage(`{"payload": true,"topic":"${this.device_id}"}`);
  }

  /* löschen der Komponente aus localStorage */
  deleteClicked(){
    const devices_einlesen = localStorage.getItem(this.raumname);
    //console.log(this.raumname);

    if (devices_einlesen) {
    this.devices = JSON.parse(devices_einlesen);}
    //console.log(this.devices);

    const deviceIDToRemove = this.device_id;
    const filteredDevices = this.devices.filter((device: { device_id: string | undefined; }) => device.device_id !== deviceIDToRemove);
    //console.log(this.devices);
    
    localStorage.setItem(this.raumname, JSON.stringify(filteredDevices));
    const componentRef: ComponentRef<LockComponent> = 
    this.referenz.destroy();
  }

}
