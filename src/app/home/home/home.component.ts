import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebApiService } from 'src/app/services/web-api.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { HandleAppService } from 'src/app/services/handle-app.service';

interface idiomas{
  codigo:String,
  nombre:String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // variables
  loading:boolean = false;  // loader
  
  formPersona:FormGroup;
  msg:String = "";
  idiomas:idiomas[]= [
    {
      codigo:"english",
      nombre: "Ingles"
    },
    {
      codigo:"spanish",
      nombre: "Español"
    },
  ]

  constructor(
    private webApiService:WebApiService,
    private handlerApp:HandleAppService
  ){}

  ngOnInit(): void {
    this.formInit();
  }


  formInit(){
    this.formPersona = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.minLength(2)]),
      language: new FormControl("english")
    });
  }


  saludar(){
    let name = this.formPersona.get('name').value;
    if(name.trim() != ""){
      this.loading = true;
      this.webApiService.getRequest("/saludar",{
        name,
        language: this.formPersona.get('language').value
      })
      .pipe(finalize(()=>this.loading = false))
      .subscribe(
        data=>{
          if(data.length > 0){
            let datos = data[0];
            this.msg = datos.saludo;
          }else{
            this.handlerApp.showError("Se produjo un error");
          }
        },
        error=>{
          this.handlerApp.showError("Se produjo un error");
        }
      );
    }else{
      this.handlerApp.showAlert("Complete la información necesaria");
      this.msg = "";
    }
  }
  nombre(){
    let name = this.formPersona.get('name').value;
    if(name.trim() != ""){
      this.loading = true;
      this.webApiService.getRequest("/",{
        name,
        language: this.formPersona.get('language').value
      })
      .pipe(finalize(()=>this.loading = false))
      .subscribe(
        data=>{
          if(data.length > 0){
            let datos = data[0];
            this.msg = datos.miNombre;
          }else{
            this.handlerApp.showError("Se produjo un error");
          }
        },
        error=>{
          this.handlerApp.showError("Se produjo un error");
        }
      );
    }else{
      this.handlerApp.showAlert("Complete la información necesaria");
      this.msg = "";
    }
  }
  despedir(){
    let name = this.formPersona.get('name').value;
    if(name.trim() != ""){
      this.loading = true;
      this.webApiService.getRequest("/despedir",{
        name,
        language: this.formPersona.get('language').value
      })
      .pipe(finalize(()=>this.loading = false))
      .subscribe(
        data=>{
          if(data.length > 0){
            let datos = data[0];
            this.msg = datos.despedida;
          }else{
            this.handlerApp.showError("Se produjo un error");
          }
        },
        error=>{
          this.handlerApp.showError("Se produjo un error");
        }
      );
    }else{
      this.handlerApp.showAlert("Complete la información necesaria");
      this.msg = "";
    }
  }
}
