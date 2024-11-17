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
      const limit = 10;
      const offset = (this.currentPage - 1) * limit;

      this.dataService.getPokemons(limit, offset).subscribe((response: any) => {
        this.totalPokemons = response.count;
  
        // Reset the pokemons array to clear the previous data on page change
        this.pokemons = [];
  
        // Fetch details for each Pokemon
        response.results.forEach((result: { name: string }) => {
          this.dataService.getMorePokemons(result.name).subscribe((uniqueResponse: any) => {
            this.pokemons.push(uniqueResponse);
          });
        });
      });



    //   this.dataService.getPokemons(10, this.currentPage + 0).subscribe((response: any) => {
    //   this.totalPokemons = response.count;

    //   response.results.forEach((result: { name: string; }) => {
    //     this.dataService.getMorePokemons(result.name).subscribe((uniqueResponse: any) => {
    //       this.pokemons.push(uniqueResponse);
    //     })
    //   })
    // })
  }

    // Handle pagination change
    onPageChange(page: number) {
      this.currentPage = page;
      this.getPokemons(); // Fetch data for the new page
    }
}
