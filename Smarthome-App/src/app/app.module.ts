import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel.component';
import { LightComponent } from './components/light/light.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { MotorComponent } from './components/motor/motor.component';
import { RoomComponent } from './room/room.component';
import { LightRgbComponent } from './components/light-rgb/light-rgb.component';
import { LockComponent } from './components/lock/lock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    LightComponent,
    TemperatureComponent,
    MotorComponent,
    RoomComponent,
    LightRgbComponent,
    LockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
