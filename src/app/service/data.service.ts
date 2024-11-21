import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getPokemons(limit: number, offset: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  getMorePokemons(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  //Magic cards
  getMagicTheGathering(limit: number, offset: number) {
    return this.http.get(`https://api.magicthegathering.io/v1/cards?pageSize=${limit}&page=${offset}`);
  }

  getMoreMagicCards(name: string) {
    return this.http.get(`https://api.magicthegathering.io/v1/cards?name=${name}`);
  }

}
