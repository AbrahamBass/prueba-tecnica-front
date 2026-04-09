import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PatientEditComponent } from './patient-edit.component';
import { PatientService } from '../../services/patient.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

describe('PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientEditComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        DropdownModule,
        NoopAnimationsModule,
        CalendarModule,
      ],
      providers: [
        PatientService,
        MessageService,
        { provide: DynamicDialogRef, useValue: {} },
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: {
              patient: { id: 1,documentType: 'CC', firstName: 'Test', lastName: 'User' },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear al componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe detectar cuando el formulario no ha cambiado', () => {
    component.ngOnInit();

    expect(component.isFormUnchanged).toBeTrue();
  });

  it('no debe llamar update si el formulario no cambia', () => {
    const service = TestBed.inject(PatientService);
    spyOn(service, 'update');

    component.ngOnInit();
    component.save();

    expect(service.update).not.toHaveBeenCalled();
  });
});
