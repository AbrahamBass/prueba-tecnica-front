import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Patient } from '../../models/patient.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css'],
})
export class PatientsTableComponent {
  @ViewChild('dt') dt!: Table;

  @Input() patients: Patient[] = [];
  @Input() totalRecords = 0;
  @Input() loading = false;
  @Input() rows = 10;
  @Input() cols: { field: string; header: string }[] = [];

  @Input() nameValue: string = '';
  @Input() docValue: string = '';

  @Output() lazyLoad = new EventEmitter<any>();
  @Output() filter = new EventEmitter<void>();

  @Output() nameChange = new EventEmitter<string>();
  @Output() docChange = new EventEmitter<string>();

  @Output() view = new EventEmitter<Patient>();
  @Output() edit = new EventEmitter<Patient>();
  @Output() delete = new EventEmitter<number>();
  @Output() clearFilters = new EventEmitter();
  @Output() onFilter = new EventEmitter();
}
