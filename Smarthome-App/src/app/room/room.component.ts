import { Component, AfterViewInit, ViewChild, ViewContainerRef,Input, ComponentRef} from '@angular/core';
import { TemperatureComponent } from 'src/app/components/temperature/temperature.component';
import { LightComponent } from 'src/app/components/light/light.component';
import { LightRgbComponent } from '../components/light-rgb/light-rgb.component';
import { LockComponent } from '../components/lock/lock.component';
import { ServoComponent } from '../components/servo/servo.component';
import { FanComponent } from '../components/fan/fan.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements AfterViewInit {

  @Input() raumname!: string;
  @Input() referenz: any;

  devices: {componentName: string, device_id: string, name: string}[] = [];
  rooms: any;

  //den DIV Container mit der Bezeichnung Container importieren
  @ViewChild( 'container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  

  ngAfterViewInit(): void {
    
    // Versuchen, Geräte für diesen Raum aus dem Local Storage zu lesen
    const devices = localStorage.getItem(this.raumname);
    if (devices) {
    this.devices = JSON.parse(devices);
    // Für jedes Gespeicherte  Gerät eine Gerätekomponente hinzufügen
    this.devices.forEach(device => this.addComponentInit(device.componentName, device.device_id, device.name));
    }
  }

  addComponent(componentName: string, device_id: string, name: string) {
    this.devices.push({componentName, device_id, name});
    // Geräte für diesen Raum im Local Storage aktualisieren
    localStorage.setItem(this.raumname, JSON.stringify(this.devices));
    
    if (componentName === 'temperature') {
      const componentRef = this.container.createComponent(TemperatureComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName === 'light') {
      const componentRef = this.container.createComponent(LightComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName == 'lightRGB') {
      const componentRef = this.container.createComponent(LightRgbComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName == 'lock') {
      const componentRef = this.container.createComponent(LockComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName == 'servo') {
      const componentRef = this.container.createComponent(ServoComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    }else if (componentName == 'fan') {
      const componentRef = this.container.createComponent(FanComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    }
    
  }

  addComponentInit(componentName: string, device_id: string, name: string) {
    // Geräte für diesen Raum im Local Storage aktualisieren
    localStorage.setItem(this.raumname, JSON.stringify(this.devices));
  
    if (componentName === 'temperature') {
      const componentRef = this.container.createComponent(TemperatureComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName === 'light') {
      const componentRef = this.container.createComponent(LightComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName == 'lightRGB') {
      const componentRef = this.container.createComponent(LightRgbComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName == 'lock') {
      const componentRef = this.container.createComponent(LockComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    } else if (componentName == 'servo') {
      const componentRef = this.container.createComponent(ServoComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    }else if (componentName == 'fan') {
      const componentRef = this.container.createComponent(FanComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
      componentRef.instance.raumname = this.raumname;
      componentRef.instance.referenz = componentRef;
    }
  
  }

  deleteClicked() {
    const rooms_einlesen = localStorage.getItem('rooms');
    
    if (rooms_einlesen) {
      this.rooms = JSON.parse(rooms_einlesen);
      console.log(this.rooms)
    }

    const roomToRemove = this.raumname;
    const filteredRooms = this.rooms.filter((room: {name: string | undefined;}) => room.name !== roomToRemove);
    console.log(filteredRooms);

    localStorage.setItem('rooms', JSON.stringify(filteredRooms));
    const componentRef: ComponentRef<RoomComponent> = 
    this.referenz.destroy();
  }
  


}
