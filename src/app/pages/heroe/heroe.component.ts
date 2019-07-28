import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private _heroeService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');

      if( id !== 'nuevo' ) {
        this._heroeService.getHeroe(id)
            .subscribe( (res: HeroeModel) => {
              this.heroe = res;
              this.heroe.id = id;
            })
      }
  }

  guardar(form: NgForm){

    if(form.invalid) {
      console.log("Formulario no valido");
      return
    }

    Swal.fire({
      title: 'Espera',
      text: 'Guardando Informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id){
       peticion = this._heroeService.actualizarHeroe(this.heroe);
    }else {
       peticion = this._heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp  => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se Guardo Correctamente',
          type: 'success'
        });
    });

  }

}
