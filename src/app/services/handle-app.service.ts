import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HandleAppService {

  constructor() { }


  showError(msg:String){
    Swal.fire({
      icon: 'error',
      title: msg,
      text: ''
    })
  }

  showAlert(msg){
    Swal.fire({
      icon: 'info',
      title: msg,
      text: ''
    })
  }
}
