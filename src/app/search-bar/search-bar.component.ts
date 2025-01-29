import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  searchTerm: string = ""

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() : void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm']
      }
    })
  }

  onSearch() : void {
    if (this.searchTerm) {
      this.router.navigate(['/search', this.searchTerm])
    } else {
      this.router.navigate([''])
    }
  }
}
