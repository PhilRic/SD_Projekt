import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BearbeitungsService {
  public showLoeschen: boolean = false;
  public showComponentHinzufuegen: boolean = false;
}
