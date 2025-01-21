import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css']
})
export class MensajeConfirmacionComponent {

  mensaje!:string
  btn='aceptar'
  constructor(public dialogRef: MatDialogRef<MensajeConfirmacionComponent> ,
     @Inject(MAT_DIALOG_DATA) public data: any)  {
        this.mensaje=data.mensaje
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
