import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { PatientsTableComponent } from './components/patients-table/patients-table.component';

import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { PatientCreateComponent } from './components/patient-create/patient-create.component';

import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';

import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PatientReportComponent } from './components/patient-report/patient-report.component';

@NgModule({
  declarations: [
    PatientsPageComponent,
    PatientsTableComponent,
    PatientCreateComponent,
    PatientDetailsComponent,
    PatientEditComponent,
    PatientReportComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToolbarModule,
    TooltipModule,
    DynamicDialogModule,
    CascadeSelectModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [DialogService],
})
export class PatientsModule {}
