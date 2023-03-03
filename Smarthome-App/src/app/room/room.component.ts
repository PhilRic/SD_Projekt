import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { TemperatureComponent } from 'src/app/components/temperature/temperature.component';
import { LightComponent } from 'src/app/components/light/light.component';
import { LightRgbComponent } from '../components/light-rgb/light-rgb.component';
import { LockComponent } from '../components/lock/lock.component';
import { MotorComponent } from '../components/motor/motor.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  //den DIV Container mit der Bezeichnung Container importieren
  @ViewChild( 'container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  

  addComponent(componentName: string, device_id: string, name: string) {
    
    
    if (componentName === 'temperature') {
      const componentRef = this.container.createComponent(TemperatureComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    } else if (componentName === 'light') {
      const componentRef = this.container.createComponent(LightComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    } else if (componentName == 'lightRGB') {
      const componentRef = this.container.createComponent(LightRgbComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    } else if (componentName == 'lock') {
      const componentRef = this.container.createComponent(LockComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    } else if (componentName == 'motor') {
      const componentRef = this.container.createComponent(MotorComponent);
      componentRef.instance.device_id = device_id;
      componentRef.instance.name = name;
    }
    
    
  }


  ngOnInit(): void {
  }

}
