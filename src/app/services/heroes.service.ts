import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { delay, delayWhen, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://filedatabase-c964d-default-rtdb.firebaseio.com'
  
  constructor( private http : HttpClient) { }

// OBSERVABLE
  button$ = new EventEmitter<String>()
  deleteConfir$ = new EventEmitter<any>()

//

crearHeroe( heroe: HeroeModel){

return this.http.post(`${this.url}/heroes.json`, heroe)
.pipe(
  map( (resp:any) =>{
  heroe.id = resp.name;
  return heroe;
  })
);
}

heroeUpdate(heroe:HeroeModel){

  const heroeTemp = {
  ...heroe
  };

  delete heroeTemp.id;

  console.log(heroe)

  return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
}

getHeroes(){

return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map(this.crearArreglo),
      delay(1000))
}
  
private crearArreglo( heroesObj: any){

  const heroes: HeroeModel[]=[]

  Object.keys( heroesObj ).forEach( key => {

    const heroe : HeroeModel = heroesObj [key]
    heroe.id = key

    heroes.push(heroe)
  })
  if (heroesObj === null){return [];}

  return heroes
}

getHeroeById(id:string){
  return this.http.get(`${this.url}/heroes/${id}.json`)
}

deleteHeroe(id:string){
return this.http.delete(`${this.url}/heroes/${id}.json`)}


}
