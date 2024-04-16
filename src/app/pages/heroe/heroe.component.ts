import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import  Swal  from 'sweetalert2'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit{
  

  heroe: HeroeModel
  accion: string = 'Guardar'
  constructor(private heroeServices: HeroesService,
              private route: ActivatedRoute){
    this.heroe = {
    nombre:"",
    poder:"",
    vivo: true
  }
  }


  ngOnInit(){
   const id:any = this.route.snapshot.paramMap.get('id')

   if (id !== 'nuevo'){
    this.accion = 'Actualizar'
  this.heroeServices.getHeroeById(id).subscribe( (resp:any) => {
  this.heroe = resp
  this.heroe.id = id

  })}
  }

  guardar(form:NgForm){

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
       Swal.fire({
          title: "Espere",
          text: "Guardando los datos",
          timer: 1500,
          icon: "info"
        });
      Swal.showLoading();

      let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroeServices.heroeUpdate( this.heroe );

    } else {
      peticion = this.heroeServices.crearHeroe( this.heroe );

    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.heroe.nombre,
        timer: 1500,
        text: `Se guardo correctamente`,
        icon: 'success'
      });
      form.reset()

    });


  

      
      
  }
}
