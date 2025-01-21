import { EmpleadoService } from './../../services/empleado.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})

export class ListEmpleadoComponent {

  displayedColumns: string[] = ['nombreCompleto', 'correo', 'estadoCivil', 'fechaIngreso', 'sexo', 'telefono','acciones'];
  dataSource!: MatTableDataSource<any>;
  listEmpleado!: Empleado[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  empleados: Empleado[] = [];

  empleadosNumerados: any[] = [];



  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog, public snackBard:MatSnackBar,private http: HttpClient){}

  ngOnInit():void{
    this.cargarEmpleados();

    this.http.get<{ empleados: Empleado[] }>('http://localhost:4000/empleados/getAll').subscribe(
      (data) => {
        this.empleados = data.empleados;
        console.log('Datos obtenidos:', data);

        // Asignar los empleados al arreglo del componente
        this.empleados = data?.empleados || [];
      },
      (error) => {
        console.error('Error al obtener empleados:', error);
      }
    );

  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  cargarEmpleados(){
    this.listEmpleado=this.empleadoService.getEmpleados();
    this.dataSource= new MatTableDataSource(this.listEmpleado);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.listEmpleado)

    this.empleadosNumerados = this.listEmpleado.map((empleado, index) => {
      return { ...empleado, numeracion: index + 1 };
    });
  }

  eliminarEmpleado(index:number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: '¿Esta seguro que desea eliminar el empleado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==='aceptar') {
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();
        this.snackBard.open('Empleado fue eliminado con exito','',{
          duration:30000
        })
      }
    });
    console.log(index);
  }
}
