import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Empleado } from './empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  formData: Empleado

  constructor(private firestore: AngularFirestore) { }

  getEmpleados(){
    return this.firestore.collection('empleados').snapshotChanges();
  }
}
