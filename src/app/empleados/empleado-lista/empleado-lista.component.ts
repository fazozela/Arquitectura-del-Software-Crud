import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/shared/empleado.service';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/shared/empleado.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-empleado-lista',
  templateUrl: './empleado-lista.component.html',
  styleUrls: ['./empleado-lista.component.css']
})
export class EmpleadoListaComponent implements OnInit {

  list: Empleado[];
  constructor(private service: EmpleadoService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getEmpleados().subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Empleado;
      })
    })
  }

  onEdit(emp:Empleado){
    this.service.formData = Object.assign({},emp);
  }

  onDelete(id: string){
    if(confirm("Estas seguro de borrar?")){
      this.firestore.doc('empleados/' +id).delete();
      this.toastr.warning('Eliminado exitosamente','Empleado registrado');
    }
  }

}
