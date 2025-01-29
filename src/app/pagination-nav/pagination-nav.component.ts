import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-pagination-nav',
  standalone: true,
  imports: [NgFor, NgIcon],
  templateUrl: './pagination-nav.component.html',
  styleUrl: './pagination-nav.component.scss'
})
export class PaginationNavComponent implements OnInit {
  @Input() totalPages!: number
  currentPage: number = 1
  maxPages: number = 5
  itemsPerPage: number = 20
  pageIndexes: number[] = []

  constructor () {}

  ngOnInit(): void {
    let pageIndex: number

    if (this.currentPage - 3 >= 1) {
      pageIndex = this.currentPage - 3
    } else if (this.currentPage - 2 == 1) {
      pageIndex = this.currentPage - 2
    } else if (this.currentPage - 1 == 1) {
      pageIndex = this.currentPage - 1
    } else {
      pageIndex = this.currentPage
    }

    for (let index = 1; index <= this.maxPages; index++) {
      if (pageIndex <= this.totalPages) {
        this.pageIndexes.push(pageIndex)
      }
      pageIndex++
    }
  }
}
