import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url: string = 'https://heroeapp-ba6c3.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel){
      return this.http.post(`${this.url}/heroes.json`, heroe)
             .pipe(
                map( (resp: any) => {
                  heroe.id = resp.name;
                  console.log(heroe);
                  return heroe;
                })
             );
  }

  actualizarHeroe(heroe: HeroeModel){

    const hereoTemp = {
      ...heroe
    }

    delete hereoTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, hereoTemp);

  }

  getHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
              .pipe(
                map( this.crearArray ),
                delay(0)
              )
  }

  borrarHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArray(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    Object.keys(heroesObj).forEach(key => {
        const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;

        Object.values(heroe);

        heroes.push( heroe );
    });

    if (heroesObj === null) {return [];}

    return heroes;
  }
}
