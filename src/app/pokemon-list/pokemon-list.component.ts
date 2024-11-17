import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
pokemons: any[] = [];
currentPage: number = 1;
totalPokemons: number = 0;

  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
        this.dataService.getPokemons(10, this.currentPage + 0).subscribe((response: any) => {
      this.totalPokemons = response.count;

      response.results.forEach((result: { name: string; }) => {
        this.dataService.getMorePokemons(result.name).subscribe((uniqueResponse: any) => {
          this.pokemons.push(uniqueResponse);
          console.log(this.pokemons)
        })
      })
    })
  }
}
