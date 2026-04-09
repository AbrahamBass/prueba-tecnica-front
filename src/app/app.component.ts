import { Component, OnInit } from '@angular/core';
import { ErrorService } from './core/services/error.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PruebaTecnica';

  constructor(
    private errorService: ErrorService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.errorService.errors$.subscribe(({ summary, detail }) => {
      this.messageService.add({
        severity: 'error',
        summary,
        detail,
        life: 10000,
      });
    });
  }
}
