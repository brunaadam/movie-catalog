import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { GenreFilterComponent } from '../../components/genre-filter/genre-filter.component';
import { Movie } from '../../shared/models/Movie';
import { Genre } from '../../shared/models/Genre';

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

interface GenreResponse {
  genres: Genre[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIcon, NgStyle, MovieCardComponent, SearchBarComponent, GenreFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('movieList') movieList!: ElementRef;
  
  movies: Movie[] = [];
  genres: Genre[] = [];
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getMovieGenres();
  }

  getPopularMovies(): void {
    this.movieService.getPopularMovies(1)
      .then(response => response.json())
      .then((response: MovieResponse) => this.successGetPopularMovies(response))
      .catch(err => console.error(err));
  }

  getMovieGenres(): void {
    this.movieService.getMovieGenres()
      .then(response => response.json())
      .then((response: GenreResponse) => this.successGetMovieGenres(response))
      .catch(err => console.error(err));
  }

  successGetPopularMovies(response: MovieResponse): void {
    this.movies = response.results;
  }

  successGetMovieGenres(response: GenreResponse): void {
    this.genres = response.genres;
  }

  scrollMovieList(direction: 'left' | 'right'): void {
    const container = this.movieList.nativeElement;
    const scrollAmount = container.clientWidth * 0.8;
    
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
