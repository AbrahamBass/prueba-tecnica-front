import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTableComponent } from './patients-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PatientsTableComponent', () => {
  let component: PatientsTableComponent;
  let fixture: ComponentFixture<PatientsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PatientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
