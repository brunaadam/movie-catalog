import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgStyle, NgIf } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MovieDetails } from '../../shared/models/MovieDetails';
import { Cast } from '../../shared/models/Cast';

interface MovieCreditsResponse {
  cast: Cast[];
  crew: any[];
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgStyle, NgIcon, NgFor, NgIf, LoaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  movieId: string = ''
  movie: MovieDetails = {} as MovieDetails
  cast: Cast[] = []
  loading: boolean = true

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.movieId = this.route.snapshot.paramMap.get('movieId') || ''
      this.getMovieDetails()
      this.getMovieCredits()
    }

    getMovieDetails(): void {
      this.movieService.getMovieDetailsById(parseInt(this.movieId))
        .then(response => response.json())
        .then((response: MovieDetails) => this.successGetMovieDetails(response))
        .catch(err => console.error(err))
    }

    getMovieCredits(): void {
      this.movieService.getMovieCreditsById(parseInt(this.movieId))
        .then(response => response.json())
        .then((response: MovieCreditsResponse) => this.successGetMovieCredits(response))
        .catch(err => console.error(err))
    }

    successGetMovieDetails(details: MovieDetails): void {
      this.movie = details
      if (this.cast.length > 0) {
        this.loading = false
      }
    }

    successGetMovieCredits(credits: MovieCreditsResponse): void {
      this.cast = credits.cast
      if (Object.keys(this.movie).length > 0) {
        this.loading = false
      }
    }
    
    getMoviePosterUrl (posterPath: string): string {
      return 'https://image.tmdb.org/t/p/w220_and_h330_face/' + posterPath
    }

    getReleaseYear (date: string): string {
      return date.split('-')[0]
    }

    getRating (voteAverage: number): string {
      return voteAverage.toFixed(1)
    }

    getRatingStar (voteAverage: number): string {
      let star = 'bootstrapStarFill'
      if (voteAverage < 8 && voteAverage >= 6) {
        star = 'bootstrapStarHalf'
      } else if (voteAverage < 6) {
         star = 'bootstrapStar'
      }

      return star
    }
}
