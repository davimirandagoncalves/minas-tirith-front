import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CofresRoutingModule } from './cofres-routing.module';
import { ListagemCofresComponent } from './listagem-cofres/listagem-cofres.component';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { CofreStatusComponent } from './cofre-status/cofre-status.component';
import { SalvarCofreComponent } from './salvar-cofre/salvar-cofre.component';
import { CofreService } from './cofre.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalvarTransacaoComponent } from './salvar-transacao/salvar-transacao.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    ListagemCofresComponent,
    CofreStatusComponent,
    SalvarCofreComponent,
    SalvarTransacaoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CofresRoutingModule,
    TableModule,
    ProgressBarModule,
    TagModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    BlockUIModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    SharedModule,
    CalendarModule,
    InputTextareaModule,
    RippleModule,
  ],
  providers: [
    CofreService,
    CurrencyPipe,
  ]
})
export class CofresModule {}
