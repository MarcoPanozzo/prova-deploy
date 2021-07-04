import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { StudentiDto, StudentiService } from '../../services/studenti.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { OrderService } from '../../services/order.service';
import { BaseResponseDto } from '../../interfaces/baseResponseDto';
import { PageableDto } from '../../interfaces/pageableDto';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DatePipe, MessageService]
})
export class DashboardComponent implements OnInit {

  studenti: any[] = [];
  page: number = 1;
  resultsPerPage: number = 10;
  totalRecords: number;
  loading: boolean = true;
  first: number = 0;
  rowId: string = "id";
  lastLazyLoad: LazyLoadEvent = null;
  request: any = null;
  columns: any[] = [
    {
      header: "ID",
      field: "id"
    },
    {
      header: "Nome",
      field: "nome"
    },
    {
      header: "Cognome",
      field: "cognome"
    }
  ];
  errors: any[] = [];

  constructor(
    private studentiService: StudentiService,
    private orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  load(event: LazyLoadEvent = null) {
    if (event === null) {
      event = this.lastLazyLoad;
    }

    this.loading = true;
    this.lastLazyLoad = event;

    if (this.request) {
      this.request.unsubscribe();
    }

    this.studentiService.getAll(
      this.page,
      this.resultsPerPage,
      this.orderService.parse(event)
    ).subscribe((resp: BaseResponseDto<PageableDto<StudentiDto[]>>) => {
      if (resp.status == 200 && resp.success) {
        this.studenti = resp.response.data;
        this.totalRecords = resp.response.totalCount;
        this.resultsPerPage = resp.response.resultsPerPage;
        event.rows = resp.response.resultsPerPage;
        event.first = 0;
      }
      if (resp.error) {
        this.errors.push("Si è verificato un errore");
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Si è verificato un problema',
          detail: 'Impossibile  caricare gli studenti'
        });
      }
      this.loading = false;
    });
  }

  onPage(event) {
    this.page = event.first / event.rows + 1;
    this.load();
  }

}
