import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import * as XLSX from 'xlsx';
import { PatientService } from '../../services/patient.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css'],
})
export class PatientReportComponent {
  selectedDate: Date | null = null;
  loading = false;

  constructor(
    public ref: DynamicDialogRef,
    private patientService: PatientService,
    private messageService: MessageService,
  ) {}

  exportExcel() {
    if (!this.selectedDate) return;

    this.loading = true;

    const dateStr = this.selectedDate.toISOString();

    this.patientService.createdAfter(dateStr).subscribe({
      next: (patients) => {
        if (patients.length === 0) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Sin resultados',
            detail:
              'No se encontraron pacientes creados después de la fecha seleccionada.',
            life: 5000,
          });

          this.loading = false;
          return;
        }

        const worksheet = XLSX.utils.json_to_sheet(patients);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

        XLSX.writeFile(
          workbook,
          `Reporte_Pacientes_Desde_${dateStr.split('T')[0]}.xlsx`,
        );

        this.loading = false;
        this.ref.close();
      },
      error: () => (this.loading = false),
    });
  }
  close() {
    this.ref.close();
  }
}
