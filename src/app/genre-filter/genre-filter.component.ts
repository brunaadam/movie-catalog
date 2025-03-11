import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../shared/models/Genre';
@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './genre-filter.component.html',
  styleUrl: './genre-filter.component.scss'
})
export class GenreFilterComponent {
  @Input() genres!: Genre[]
  
  constructor(private router: Router) {}

  goToGenrePage (genreName: string) : void {
    this.router.navigate(['/genre', genreName.toLocaleLowerCase()])
  }
}
