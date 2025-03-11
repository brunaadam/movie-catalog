export interface MovieDetails {
	id: number
	title: string
	poster_path: string
	release_date: string
	overview: string,
	adult: boolean,
	backdrop_path: string,
	genre_ids: number[],
	original_language: string,
	original_title: string,
	popularity: number,
	video: boolean,
	vote_average: number,
	vote_count: number,
	belongs_to_collection: string,
	budget: number,
	genres: any[],
	homepage: string,
	imdb_id: string,
	production_companies: any[],
	production_countries: any[],
	revenue: number,
	runtime: number,
	spoken_languages: any[],
	status: string,
	tagline: string
}
