import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientService } from '../../services/patient.service'; // Ajusta la ruta
import { Patient } from '../../models/patient.model';
import { MessageService } from 'primeng/api';
import { DOCUMENT_TYPES } from 'src/app/core/constans/const';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
})
export class PatientEditComponent implements OnInit {
  patientForm!: FormGroup;
  loading = signal(false);
  patientId!: number;
  initialValues: any;

  documentTypes = DOCUMENT_TYPES;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const patient: Patient = this.config.data.patient;
    if (patient) {
      this.patientId = patient.patientId!;
      this.patientForm.patchValue({
        ...patient,
        birthDate: patient.birthDate ? new Date(patient.birthDate) : null,
      });
      this.initialValues = JSON.stringify(this.patientForm.value);
    }
  }

  private initForm() {
    this.patientForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      phoneNumber: [''],
      birthDate: [null, Validators.required],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.patientForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  save() {
    if (this.isFormUnchanged) return;

    if (this.patientForm.invalid) return;

    this.loading.set(true);
    const formValue = this.patientForm.value;

    const payload = {
      ...formValue,
      birthDate:
        formValue.birthDate instanceof Date
          ? formValue.birthDate.toISOString().split('T')[0]
          : formValue.birthDate,
    };

    this.patientService.update(this.patientId, payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado!',
          detail: 'El paciente ha sido actualizado exitosamente.',
          life: 3000,
        });
        this.ref.close(true);
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }

  get isFormUnchanged(): boolean {
    return JSON.stringify(this.patientForm.value) === this.initialValues;
  }

  close() {
    this.ref.close(false);
  }
}
