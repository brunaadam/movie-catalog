import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { PaginationNavComponent } from '../../components/pagination-nav/pagination-nav.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Movie } from '../../shared/models/Movie';

interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, SearchBarComponent, MovieCardComponent, PaginationNavComponent, NgIf, LoaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  movies: Movie[] = []
  searchTerm: string = ""
  moviePages: number = 1
  loading: boolean = true
  currentPage: number = 1
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
      .then((response: MovieSearchResponse) => this.successGetMovies(response))
      .catch(err => console.error(err))
  }

  successGetMovies(response: MovieSearchResponse) : void {
    this.movies = response.results
    this.moviePages = response.total_pages
    this.loading = false
  }

  onPageChange(page: number): void {
    this.loading = true;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getMoviesByTitle(page);
  }
}
