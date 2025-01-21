import { Empleado } from './../../models/empleado';
import { EmpleadoService } from './../../services/empleado.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEmpleadoComponent {

  myForm!:FormGroup
  estadosCiviles:any[]=['Soltero', 'Casado', 'Divorciado']
  idEmpleado:any;
  accion='Crear';
  index!:number
  private empleadoSubscription: Subscription | undefined;
  constructor(private fb:FormBuilder,
    private empleadoService:EmpleadoService,
    private route:Router,
    private snackBard:MatSnackBar,
    private aRoute:ActivatedRoute){
    this.myForm=this.fb.group({
      nombreCompleto:['', [Validators.required, Validators.maxLength(20)]] ,
      fechaIngreso:['', [Validators.required, Validators.email]],
      correo:['', [Validators.required]],
      telefono:['', [Validators.required]],
      estadoCivil:['', [Validators.required]],
      sexo:['', [Validators.required]]
    });
    const idParam='id';
    this.idEmpleado=this.aRoute.snapshot.params[idParam];

  }
  ngOnInit():void{
    if (this.idEmpleado !== undefined) {
      this.accion='Editar'
      this.esEmpleado()
    }

  }

  guardarEmpleado(){

    console.log(this.myForm);
   const empleado:Empleado = {
      nombreCompleto:this.myForm.get('nombreCompleto')!.value,
      correo:this.myForm.get('correo')!.value,
      fechaIngreso:this.myForm.get('fechaIngreso')!.value,
      telefono:this.myForm.get('telefono')!.value,
      estadoCivil:this.myForm.get('estadoCivil')!.value,
      sexo:this.myForm.get('sexo')!.value
    };

    if (this.idEmpleado !== undefined) {
    }
    else{
        this.agregarEmpleado(empleado)
    }

  }

  agregarEmpleado(empleado:Empleado){


    this.empleadoService.agregarEmpleado(empleado).subscribe(
      () => {
        console.log('Empleado agregado correctamente.');
        // Puedes agregar lógica adicional aquí si es necesario después de agregar el empleado
      },
      (error) => {
        console.error('Error al agregar empleado:', error);
      }
    );

    this.route.navigate(['/'])
    this.snackBard.open('Empleado fue agregado con exito','',{
      duration:3000
       })
  }


  esEmpleado() {

  this.empleadoSubscription = this.empleadoService
  .getEmpleado(this.idEmpleado)
  .subscribe(
    (empleado: Empleado) => {
      if (empleado) {
        console.log(empleado);
        this.myForm.patchValue({
          nombreCompleto: empleado.nombreCompleto,
          correo: empleado.correo,
          estadoCivil: empleado.estadoCivil,
          fechaIngreso: empleado.fechaIngreso,
          sexo: empleado.sexo,
          telefono: empleado.telefono,
        });
      } else {
        console.warn('Empleado no encontrado.');
      }
    },
    (error) => {
      console.error('Error al obtener empleado:', error);
    }
  );
  }

  ngOnDestroy() {
    // Importante desuscribirse para evitar pérdida de memoria y posibles fugas de observables
    if (this.empleadoSubscription) {
      this.empleadoSubscription.unsubscribe();
    }
  }
   }
