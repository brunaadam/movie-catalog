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

  getMoviesByGenre(page: number, genreId?: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };

    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`

    if (genreId) {
      url += `&with_genres=${genreId}`
    }

    return fetch(url, options)
  }


  getMoviesByTitle(page: number, title: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };

    let url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}`

    if (title) {
      url += `&query=${title}`
    }

    return fetch(url, options)
  }

  getMovieDetailsById(movieId: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };

    let url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
    return fetch(url, options)
  }

  getMovieCreditsById(movieId: number) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI0NzBmMTA2YWE5MjdlNmYwYzQwMWY0NWE1YjJmOCIsIm5iZiI6MTcyNzk3ODQxMy4wMzk1MDEsInN1YiI6IjY2ZmVkYTI3OTI1ZmRmOTI1YjdjOWRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2EelH6htWb75DTEbgrNVklpvHx-jwvXu0wX_iFa1eI'
      }
    };

    let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
    return fetch(url, options)
  }
}
