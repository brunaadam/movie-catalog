import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapChevronLeft, bootstrapChevronRight } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapChevronLeft, bootstrapChevronRight })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-catalog';
}
