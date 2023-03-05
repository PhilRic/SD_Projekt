import { Component, OnInit, ViewChild, ViewContainerRef,} from '@angular/core';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent {


//den DIV Container mit der Bezeichnung Container importieren
@ViewChild( 'container', { read: ViewContainerRef })
container!: ViewContainerRef;

  addComponent(raumname: string) {

    const componentRef = this.container.createComponent(RoomComponent);
      componentRef.instance.raumname = raumname;

  }
}
