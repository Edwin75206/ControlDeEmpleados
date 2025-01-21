import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEditEmpleadoComponent } from './componentes/add-edit-empleado/add-edit-empleado.component';
import { ListEmpleadoComponent } from './componentes/list-empleado/list-empleado.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { MensajeConfirmacionComponent } from './componentes/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AngularMaterialModule } from './componentes/shared/angular-material/angular-material.module';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AddEditEmpleadoComponent,
    ListEmpleadoComponent,
    NavbarComponent,
    MensajeConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule // Agrega HttpClientModule a la lista de imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
