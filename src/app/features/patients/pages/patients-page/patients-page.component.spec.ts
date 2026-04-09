import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsPageComponent } from './patients-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

describe('PatientsPageComponent', () => {
  let component: PatientsPageComponent;
  let fixture: ComponentFixture<PatientsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsPageComponent],
      imports: [HttpClientTestingModule],
      providers: [ConfirmationService, DialogService, MessageService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PatientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear al componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe limpiar filtros y recargar datos', () => {
    spyOn(component, 'loadPatients');

    component.nameFilter = 'test';
    component.documentFilter = '123';

    component.clearFilters();

    expect(component.nameFilter).toBe('');
    expect(component.documentFilter).toBe('');
    expect(component.loadPatients).toHaveBeenCalled();
  });

  it('debe calcular correctamente la paginación en onLazyLoad', () => {
    spyOn(component, 'loadPatients');

    const event = {
      first: 10,
      rows: 10,
    };

    component.onLazyLoad(event);

    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(10);
    expect(component.loadPatients).toHaveBeenCalledWith(2, 10, '', '');
  });

  it('no debe ejecutar onLazyLoad si loadingTable está activo', () => {
    spyOn(component, 'loadPatients');

    component.loadingTable.set(true);

    component.onLazyLoad({
      first: 0,
      rows: 10,
    });

    expect(component.loadPatients).not.toHaveBeenCalled();
  });
});
