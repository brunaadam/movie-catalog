import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { GenreFilterComponent } from '../genre-filter/genre-filter.component';
import { Movie } from '../shared/models/Movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIcon, NgStyle, MovieCardComponent, SearchBarComponent, GenreFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('movieList') movieList!: ElementRef;
  
  movies:Movie[] = []
  genres:any[] = []
  constructor(private movieService: MovieService) {}

  ngOnInit() : void {
    this.getPopularMovies()
    this.getMovieGenres()
  }

  getPopularMovies () : void {
    this.movieService.getPopularMovies(1)
      .then(response => response.json())
      .then(response => this.successGetPopularMovies(response))
      .catch(err => console.error(err))
  }

  getMovieGenres () : void {
    this.movieService.getMovieGenres()
      .then(response => response.json())
      .then(response => this.successGetMovieGenres(response))
      .catch(err => console.error(err))
  }

  successGetPopularMovies (response: any) : void { // adicionar tipo
    this.movies = response.results
  }

  successGetMovieGenres (response: any) : void {
    this.genres = response.genres
  }

  scrollMovieList(direction: 'left' | 'right'): void {
    const container = this.movieList.nativeElement;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% da largura visível
    
    if (direction === 'left') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}
