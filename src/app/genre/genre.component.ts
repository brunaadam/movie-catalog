import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { PaginationNavComponent } from '../pagination-nav/pagination-nav.component';
import { MovieService } from '../services/movie.service';
import { GenreFilterComponent } from '../genre-filter/genre-filter.component';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { Movie } from '../shared/models/Movie';
import { Genre } from '../shared/models/Genre';

interface MoviesByGenreResponse {
  results: Movie[];
  total_pages: number;
}

interface GenreResponse {
  genres: Genre[];
}

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [MovieCardComponent, PaginationNavComponent, NgFor, GenreFilterComponent, NgIf, LoaderComponent],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent implements OnInit, OnDestroy {
  movies: Movie[] = []
  currentPage: number = 1
  genreName: string = ""
  genreId: number = -1
  genreList: Genre[] = []
  moviePages: number = 1
  loading: boolean = true
  private routeSubscription!: Subscription

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMovieGenres()
    
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.genreName = params.get('genreName') || ''
      this.loading = true
      
      if (this.genreList.length > 0) {
        this.updateGenreAndMovies()
      }
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  updateGenreAndMovies(): void {
    const genre: Genre | undefined = this.genreList.find(item => item.name.toLowerCase() === this.genreName)
    
    if (genre) {
      this.genreId = genre.id
      this.getMoviesByGenre(1)
    }
  }

  getMovieGenres () : void {
    this.movieService.getMovieGenres()
      .then(response => response.json())
      .then((response: GenreResponse) => this.successGetMovieGenres(response))
      .catch(err => console.error(err))
  }

  successGetMovieGenres (response: GenreResponse) : void {
    this.genreList = response.genres
    this.updateGenreAndMovies()
  }

  getMoviesByGenre(page: number) : void {
    this.movieService.getMoviesByGenre(page, this.genreId)
      .then(response => response.json())
      .then((response: MoviesByGenreResponse) => this.successGetMovies(response))
      .catch(err => console.error(err))
  }

  successGetMovies(response: MoviesByGenreResponse) : void {
    this.movies = response.results
    this.moviePages = response.total_pages
    this.loading = false
  }

  onPageChange(page: number): void {
    this.loading = true;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getMoviesByGenre(page);
  }
}
