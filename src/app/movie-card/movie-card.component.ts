import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie!: any

  getMoviePosterUrl (posterPath: string) {
    return 'https://image.tmdb.org/t/p/w220_and_h330_face/' + posterPath
  }
}
