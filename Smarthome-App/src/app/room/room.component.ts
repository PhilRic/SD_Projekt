import { Component, AfterViewInit, ViewChild, ViewContainerRef,Input} from '@angular/core';
import { TemperatureComponent } from 'src/app/components/temperature/temperature.component';
import { LightComponent } from 'src/app/components/light/light.component';
import { LightRgbComponent } from '../components/light-rgb/light-rgb.component';
import { LockComponent } from '../components/lock/lock.component';
import { ServoComponent } from '../components/servo/servo.component';
import { FanComponent } from '../components/fan/fan.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements AfterViewInit {

  @Input() raumname!: string;

  devices: {componentName: string, device_id: string, name: string}[] = [];

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
    } else if (componentName == 'lock') {
      const componentRef = this.container.createComponent(LockComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    } else if (componentName == 'servo') {
      const componentRef = this.container.createComponent(ServoComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    }else if (componentName == 'fan') {
      const componentRef = this.container.createComponent(FanComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    }
    
  }

  addComponentInit(componentName: string, device_id: string, name: string) {
    // Geräte für diesen Raum im Local Storage aktualisieren
    localStorage.setItem(this.raumname, JSON.stringify(this.devices));
  
  if (componentName === 'temperature') {
    const componentRef = this.container.createComponent(TemperatureComponent);
    componentRef.instance.device_id = device_id;
    componentRef.instance.name = name;
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
  } else if (componentName == 'lock') {
    const componentRef = this.container.createComponent(LockComponent);
    componentRef.instance.device_id = device_id;
    componentRef.instance.name = name;
  } else if (componentName == 'servo') {
    const componentRef = this.container.createComponent(ServoComponent);
    componentRef.instance.device_id = device_id;
    componentRef.instance.name = name;
  }else if (componentName == 'fan') {
    const componentRef = this.container.createComponent(FanComponent);
    componentRef.instance.device_id = device_id;
    componentRef.instance.name = name;
  }
  
}


  


}
