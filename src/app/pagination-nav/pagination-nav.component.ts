import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-pagination-nav',
  standalone: true,
  imports: [NgFor, NgIcon, NgClass],
  templateUrl: './pagination-nav.component.html',
  styleUrl: './pagination-nav.component.scss'
})
export class PaginationNavComponent implements OnInit {
  @Input() totalPages!: number
  @Output() pageChange = new EventEmitter<number>()
  @Input() currentPage: number = 1
  maxPages: number = 5
  itemsPerPage: number = 20
  pageIndexes: number[] = []
  startIndex: number = 1

  constructor () {}

  ngOnInit(): void {
    this.updatePageIndexes()
  }

  updatePageIndexes(): void {
    this.pageIndexes = []
    let pageIndex = this.startIndex

    for (let i = 0; i < this.maxPages; i++) {
      if (pageIndex <= this.totalPages) {
        this.pageIndexes.push(pageIndex)
      }
      pageIndex++
    }
  }

  navigatePages(direction: 'left' | 'right'): void {
    if (direction === 'right' && this.startIndex + this.maxPages <= this.totalPages) {
      this.startIndex += this.maxPages
    } else if (direction === 'left' && this.startIndex - this.maxPages >= 1) {
      this.startIndex -= this.maxPages
    }
    this.updatePageIndexes()
  }

  selectPage(page: number): void {
    this.currentPage = page
    this.pageChange.emit(page)
  }

  canNavigateLeft(): boolean {
    return this.startIndex > 1
  }

  canNavigateRight(): boolean {
    return this.startIndex + this.maxPages <= this.totalPages
  }
}
