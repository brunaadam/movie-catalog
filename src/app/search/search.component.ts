import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieService } from '../services/movie.service';
import { PaginationNavComponent } from '../pagination-nav/pagination-nav.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, SearchBarComponent, MovieCardComponent, PaginationNavComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  movies: any[] = []
  searchTerm: string = ""
  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.searchTerm = params.get('searchTerm') || ""
      this.getMoviesByTitle(1)
    })
  }

  getMoviesByTitle(page: number) : void {
    this.movieService.getMoviesByTitle(page, this.searchTerm)
      .then(response => response.json())
      .then(response => this.successGetMovies(response))
      .catch(err => console.error(err))
  }

  successGetMovies(response: any) : void {
    this.movies = response.results
  }
}
