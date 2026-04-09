import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientService } from '../../services/patient.service';
import { CreatePatientPayload } from '../../models/patient.model';
import { MessageService } from 'primeng/api';
import { DOCUMENT_TYPES } from 'src/app/core/constans/const';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css'],
})
export class PatientCreateComponent implements OnInit {
  patientGroup!: FormGroup;

  loading = signal<boolean>(false);

  documentTypes = DOCUMENT_TYPES;

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.patientGroup = this.fb.group({
      documentType: [null, Validators.required],
      documentNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', [Validators.required]],
      email: [null, [Validators.email]],
      phone: [null],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.patientGroup.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  async save() {
    if (this.patientGroup.invalid) return;

    const value = this.patientGroup.value;

    this.loading.set(true);

    let formattedDate = value.birthDate.toISOString().split('T')[0];

    const payload: CreatePatientPayload = {
      documentType: value.documentType,
      documentNumber: value.documentNumber!,
      firstName: value.firstName!,
      lastName: value.lastName!,
      birthDate: formattedDate,
      email: value.email || null,
      phoneNumber: value.phone || null,
    };

    this.patientService.create(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Confirmado!',
          detail: 'El paciente ha sido registrado exitosamente.',
          life: 3000,
        });
        this.ref.close(true);
      },
      error: (_) => {
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  cancel() {
    this.ref.close(false);
  }
}
