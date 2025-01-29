import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { PaginationNavComponent } from '../pagination-nav/pagination-nav.component';
import { MovieService } from '../services/movie.service';
import { GenreFilterComponent } from '../genre-filter/genre-filter.component';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [MovieCardComponent, PaginationNavComponent, NgFor, GenreFilterComponent, NgIf],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent implements OnInit {
  movies: any[] = []
  genreName: string = ""
  genreId: number = -1
  genreList: any[] = []
  moviePages: number = 1
  loading: boolean = true

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMovieGenres()
    this.genreName = this.route.snapshot.paramMap.get('genreName') || ''
  }

  getMovieGenres () : void {
    this.movieService.getMovieGenres()
      .then(response => response.json())
      .then(response => this.successGetMovieGenres(response))
      .catch(err => console.error(err))
  }

  successGetMovieGenres (response: any) : void {
    this.genreList = response.genres
    const genre: any = this.genreList.find(item => item.name.toLowerCase() === this.genreName)

    if (genre) {
      this.genreId = genre.id
    }

    this.getMoviesByGenre(1)
  }

  getMoviesByGenre(page: number) : void {
    this.movieService.getMoviesByGenre(page, this.genreId)
      .then(response => response.json())
      .then(response => this.successGetMovies(response))
      .catch(err => console.error(err))
  }

  successGetMovies(response: any) : void {
    this.movies = response.results
    this.moviePages = response.total_pages
    this.loading = false
  }
}
