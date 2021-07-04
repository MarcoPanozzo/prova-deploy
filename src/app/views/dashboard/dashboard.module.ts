import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../modules/shared.modules';
import { CommonModule } from '@angular/common';
import { DettaglioComponent } from './dettaglio/dettaglio.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent, DettaglioComponent ]
})
export class DashboardModule { }
