import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportComponent } from './patient-report.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('PatientReportComponent', () => {
  let component: PatientReportComponent;
  let fixture: ComponentFixture<PatientReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientReportComponent],
      imports: [HttpClientTestingModule],
      providers: [
        MessageService,
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DynamicDialogConfig, useValue: { data: {} } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
