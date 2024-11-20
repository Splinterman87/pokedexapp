import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'
import { trigger, style, transition, animate, state, query, stagger} from '@angular/animations';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  animations: [
    trigger('cardFlip', [
      state('default', style({ transform: 'rotateY(0)' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      transition('default => flipped', [
        animate('0.6s ease-out')
      ]),
      transition('flipped => default', [
        animate('0.5s ease-in')
      ])
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query('.box', [
          style({ opacity: 0, transform: 'translateX(100%)' }),
          stagger(100, [
            animate('0.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
          style({ backgroundColor: 'red' }) // Temporary visual test
        ], { optional: true }),
      ])
    ])
  ]

})



export class PokemonListComponent implements OnInit {
pokemons: any[] = [];
currentPage: number = 1;
totalPokemons: number = 0;
cardStates: string[] = [];


  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.pokemons = [];
    setTimeout(() => {
      this.getPokemons();
    }, 1000);
  }

  getPokemons() {
      const limit = 12;
      const offset = (this.currentPage - 1) * limit;

      this.dataService.getPokemons(limit, offset).subscribe((response: any) => {
        this.totalPokemons = response.count;
  
        // Reset the pokemons array to clear the previous data on page change
        this.pokemons = [];
        this.cardStates = [];
  
        // Fetch details for each Pokemon
        response.results.forEach((result: { name: string }, index: number) => {
          this.dataService.getMorePokemons(result.name).subscribe((uniqueResponse: any) => {

              this.pokemons.push(uniqueResponse);
              this.cardStates.push('flipped');

              setTimeout (() => {
                this.cardStates[index] = 'default';
              }, 1000 + index * 1000);
          });
        });
      });
  }

    // Handle pagination change
    onPageChange(page: number) {
      this.currentPage = page;
      this.getPokemons(); // Fetch data for the new page
    }
}
