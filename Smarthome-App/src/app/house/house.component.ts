import { Component, OnInit,AfterViewInit,ViewChild, ViewContainerRef,} from '@angular/core';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements AfterViewInit{
  rooms: { name: string, devices: { name: string, type: string, id: string }[] }[] = [];

//den DIV Container mit der Bezeichnung Container importieren

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  addComponent(raumname: string) {
    
    // Raum hinzufügen
    this.rooms.push({ name: raumname, devices: [] });
    // Räume im Local Storage speichern
    localStorage.setItem('rooms', JSON.stringify(this.rooms));
    // Raum-Komponente generieren
    const componentRef = this.container.createComponent(RoomComponent);
    componentRef.instance.raumname = raumname;
    componentRef.instance.referenz = componentRef;
    
    
    
    // Räumeigenschaften an die Raum-Komponente Den Array mit der Device Liste Übergben
    //componentRef.instance.devices = this.rooms[this.rooms.length - 1].devices;
    }
  
  
  ngAfterViewInit() {
    
    // Beim Laden der Seite die gespeicherten Daten aus dem Local Storage auslesen
    const savedRooms = localStorage.getItem('rooms');
    console.log(savedRooms);
    if (savedRooms) {
    this.rooms = JSON.parse(savedRooms);
    
    // Räume generieren
    this.rooms.forEach(room => {
      console.log(room.name);
    const componentRef1 = this.container.createComponent(RoomComponent);
    componentRef1.instance.raumname = room.name;
    console.log(room.name);
    });
    }
    }

}
