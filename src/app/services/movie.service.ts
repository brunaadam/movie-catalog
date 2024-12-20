import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getPopularMovies(page: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };

    const url = `https://api.themoviedb.org/3/movie/popular?language=en-EN&page=${page}`
    
    return fetch(url, options)
  }

  getMovieGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

    return fetch(url, options)
  }

  getMoviesByGenre(genreId: number, page: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`

    return fetch(url, options)
  }
}
