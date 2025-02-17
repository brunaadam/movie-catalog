import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgStyle } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgStyle, NgIcon, NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  movieId: string = ''
  movie: any = {}
  cast: any[] = []

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.movieId = this.route.snapshot.paramMap.get('movieId') || ''
      this.getMovieDetails()
      this.getMovieCredits()
    }

    getMovieDetails() {
      this.movieService.getMovieDetailsById(parseInt(this.movieId))
        .then(response => response.json())
        .then(response => this.successGetMovieDetails(response))
        .catch(err => console.error(err))
    }

    getMovieCredits() {
      this.movieService.getMovieCreditsById(parseInt(this.movieId))
        .then(response => response.json())
        .then(response => this.successGetMovieCredits(response))
        .catch(err => console.error(err))
    }

    successGetMovieDetails(details: any) {
      console.log(details)
      this.movie = details
    }

    successGetMovieCredits(credits: any) {
      this.cast = credits.cast
      console.log(credits)
    }
    
    getMoviePosterUrl (posterPath: string) {
      return 'https://image.tmdb.org/t/p/w220_and_h330_face/' + posterPath
    }

    getReleaseYear (date: string) {
      return date.split('-')[0]
    }

    getRating (voteAverage: number) {
      return voteAverage.toFixed(1)
    }

    getRatingStar (voteAverage: number) {
      let star = 'bootstrapStarFill'
      if (voteAverage < 8 && voteAverage >= 6) {
        star = 'bootstrapStarHalf'
      } else if (voteAverage < 6) {
         star = 'bootstrapStar'
      }

      return star
    }
}
