import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private _heroeService: HeroesService) { }

  ngOnInit() {

      this.cargando = true;
      this._heroeService.getHeroes()
          .subscribe( res => {
              this.cargando = false;
              this.heroes = res;
          })
  }

  borrarHeroe(hereo: HeroeModel, i: number){

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas seguro que desea borrar a ${hereo.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( res => {
      if(res.value){
        this.heroes.splice(i, 1);
        this._heroeService.borrarHeroe(hereo.id).subscribe();
      }
    });
  }

}
