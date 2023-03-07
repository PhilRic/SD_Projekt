import { Component, OnInit,AfterViewInit,ViewChild, ViewContainerRef,} from '@angular/core';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements AfterViewInit{
  rooms: { name: string }[] = [];
  showhinzufuegen: boolean = false;

 //den DIV Container mit der Bezeichnung Container importieren
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  addComponent(raumname: string) {
    
    // Raum hinzufügen
    this.rooms.push({ name: raumname});
    // Räume im Local Storage speichern
    localStorage.setItem('rooms', JSON.stringify(this.rooms));
    // Raum-Komponente generieren
    const componentRef = this.container.createComponent(RoomComponent);
    componentRef.instance.raumname = raumname;
    componentRef.instance.referenz = componentRef;

    this.showhinzufuegen = false;
  }
  
  
  ngAfterViewInit() {
    
    // Beim Laden der Seite die gespeicherten Daten aus dem Local Storage auslesen
    const savedRooms = localStorage.getItem('rooms');
    console.log(savedRooms);
    if (savedRooms) {
      this.rooms = JSON.parse(savedRooms);
      // Räume generieren
      this.rooms.forEach(room => {
        const componentRef1 = this.container.createComponent(RoomComponent);
        componentRef1.instance.raumname = room.name;
        componentRef1.instance.referenz = componentRef1; //Das fehlt @Phillip du konntest die Komponente nur dann löschen, wenn sie grade erstellt worden ist
      });
    }
  }

}
