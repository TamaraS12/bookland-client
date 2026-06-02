import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreForm } from './genre-form';

describe('GenreForm', () => {
  let component: GenreForm;
  let fixture: ComponentFixture<GenreForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
