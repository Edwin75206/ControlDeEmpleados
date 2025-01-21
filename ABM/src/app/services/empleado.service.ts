import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:4000/empleados/getAll';


  listEmpleado:Empleado[]=[]
  constructor(private http: HttpClient) {}
  getEmpleados(){
    return this.listEmpleado.slice();
  }

  eliminarEmpleado(index:number){

    // Llamada al servicio para eliminar un empleado por su ID
    this.http.delete(`http://localhost:4000/empleados/deleteOne/${index}`).subscribe(
      () => {
        console.log('Empleado eliminado correctamente.');
        // Actualizar la lista de empleados después de la eliminación
        this.obtenerEmpleados();
      },
      (error) => {
        console.error('Error al eliminar empleado:', error);
      }
    );
  }

  agregarEmpleado(empleado: any): Observable<any>{
    const url = 'http://localhost:4000/empleados/insertOne';
    return this.http.post(url, empleado);
  }

  getEmpleado(index:number): Observable<Empleado>{
    const url = `http://localhost:4000/empleados/getOne/${index}`;

    return this.http.get<Empleado>(url);
  }
  editEmpleado(empleado:any): Observable<any> {
    const url = `http://localhost:4000/empleados/update`;
return this.http.post(url,empleado);
    }


  obtenerEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // empleado.service.ts


}
