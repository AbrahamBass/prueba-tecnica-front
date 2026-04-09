import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  patient?: Patient;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.patient = this.config.data.patient;
    }
  }

  close() {
    this.ref.close();
  }
}
