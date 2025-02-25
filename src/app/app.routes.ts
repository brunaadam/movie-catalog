import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { GenreComponent } from './genre/genre.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'search/:searchTerm', component: SearchComponent },
	{ path: 'genre/:genreName', component: GenreComponent },
	{ path: 'details/:movieId', component: DetailsComponent }
];
