import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFilterComponent } from './genre-filter.component';

describe('GenrePickerComponent', () => {
  let component: GenreFilterComponent;
  let fixture: ComponentFixture<GenreFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
