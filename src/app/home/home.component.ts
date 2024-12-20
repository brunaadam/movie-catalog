import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIcon, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies:any[] = []
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
    this.genres.forEach(genre => this.getMoviesByGenre(genre))
  }

  getMoviesByGenre (genre: any) : void {
    this.movieService.getMoviesByGenre(genre.id, 1)
      .then(response => response.json())
      .then(response => this.successGetMoviesByGenre(response, genre))
      .catch(err => console.error(err))
  }

  successGetMoviesByGenre (response: any, genre: any) : void {
    console.log(response)
    genre.movies = response.results
  }

  getMoviePosterUrl (posterPath: string) {
    return 'https://image.tmdb.org/t/p/w220_and_h330_face/' + posterPath
  }
}
