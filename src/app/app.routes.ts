import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { GenreComponent } from './pages/genre/genre.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'search/:searchTerm', component: SearchComponent },
	{ path: 'genre/:genreName', component: GenreComponent },
	{ path: 'details/:movieId', component: DetailsComponent }
];
