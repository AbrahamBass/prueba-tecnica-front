import { Component, signal, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientCreateComponent } from '../../components/patient-create/patient-create.component';
import { PatientDetailsComponent } from '../../components/patient-details/patient-details.component';
import { PatientEditComponent } from '../../components/patient-edit/patient-edit.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PatientReportComponent } from '../../components/patient-report/patient-report.component';
import { PatientsTableComponent } from '../../components/patients-table/patients-table.component';
import { COLS } from 'src/app/core/constans/const';

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.css'],
})
export class PatientsPageComponent {
  ref: DynamicDialogRef | undefined;

  loadingTable = signal(false);
  loadingCSV = signal(false);
  
  totalRecords = signal(0);
  patients = signal<Patient[]>([]);

  currentPage = 1;
  pageSize = 10;

  nameFilter = '';
  documentFilter = '';

  cols = COLS;

  @ViewChild(PatientsTableComponent) tableComponent!: PatientsTableComponent;

  constructor(
    private patientService: PatientService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  loadPatients(page: number, pageSize: number, name?: string, doc?: string) {
    setTimeout(() => this.loadingTable.set(true));
    this.patientService.getAll(page, pageSize, name, doc).subscribe({
      next: (response) => {
        this.patients.set(response.items);
        this.totalRecords.set(response.totalCount);
      },
      error: (_) => this.loadingTable.set(false),
      complete: () => this.loadingTable.set(false),
    });
  }

  showCreatePatient() {
    this.ref = this.dialogService.open(PatientCreateComponent, {
      header: 'Registrar Nuevo Paciente',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((success: boolean) => {
      if (!success) return;
      this.loadPatients(this.currentPage, this.pageSize);
    });
  }

  exportCSV() {
    if (this.tableComponent?.dt) {
      this.loadingCSV.set(true);
      this.tableComponent.dt.exportCSV();
      setTimeout(() => this.loadingCSV.set(false), 500);
    }
  }

  showReportModal() {
    this.dialogService.open(PatientReportComponent, {
      header: 'Generar Reporte de Pacientes',
      width: '400px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  onFilter() {
    console.log(this.nameFilter);
    this.currentPage = 1;
    this.loadPatients(1, this.pageSize, this.nameFilter, this.documentFilter);
  }

  clearFilters() {
    this.nameFilter = '';
    this.documentFilter = '';
    this.currentPage = 1;

    this.loadPatients(this.currentPage, this.pageSize);
  }

  onLazyLoad(event: any) {
    if (this.loadingTable()) return;
    const page = event.first / event.rows + 1;
    const pageSize = event.rows;

    this.currentPage = page;
    this.pageSize = pageSize;

    this.loadPatients(page, pageSize, this.nameFilter, this.documentFilter);
  }

  openDetail(event: Patient) {
    this.ref = this.dialogService.open(PatientDetailsComponent, {
      header: 'Detalles del Paciente',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        patient: event,
      },
    });
  }
  openEdit(event: Patient) {
    this.ref = this.dialogService.open(PatientEditComponent, {
      header: 'Editar Paciente',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        patient: event,
      },
    });

    this.ref.onClose.subscribe((success: boolean) => {
      if (!success) return;
      this.loadPatients(this.currentPage, this.pageSize);
    });
  }
  delete(id: number) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',

      accept: () => {
        this.patientService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'El paciente ha sido removido correctamente',
            });
            this.loadPatients(this.currentPage, this.pageSize);
          },
          error: () => {},
        });
      },
    });
  }
}
