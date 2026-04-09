import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PatientCreateComponent } from './patient-create.component';
import { PatientService } from '../../services/patient.service';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

describe('PatientCreateComponent', () => {
  let component: PatientCreateComponent;
  let fixture: ComponentFixture<PatientCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientCreateComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        DropdownModule,
        NoopAnimationsModule,
        CalendarModule,
      ],
      providers: [
        MessageService,
        {
          provide: DynamicDialogRef,
          useValue: jasmine.createSpyObj('DynamicDialogRef', ['close']),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(PatientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear al componente', () => {
    expect(component).toBeTruthy();
  });

  it('no debe llamar al servicio si el formulario es inválido', () => {
    const service = TestBed.inject(PatientService);
    spyOn(service, 'create');

    component.ngOnInit();
    component.save();

    expect(service.create).not.toHaveBeenCalled();
  });

  it('debe llamar a create con el payload formateado', () => {
    const service = TestBed.inject(PatientService);
    spyOn(service, 'create').and.returnValue(of({}));

    component.ngOnInit();

    component.patientGroup.setValue({
      documentType: 'CC',
      documentNumber: '123',
      firstName: 'Juan',
      lastName: 'Perez',
      birthDate: new Date('2000-01-01'),
      email: 'test@test.com',
      phone: '123456',
    });

    component.save();

    expect(service.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        birthDate: '2000-01-01',
      }),
    );
  });
});
