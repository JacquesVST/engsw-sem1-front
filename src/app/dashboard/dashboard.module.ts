import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { AparelhoModule } from '../aparelho/aparelho.module';
import { ClienteModule } from '../cliente/cliente.module';
import { FabricanteModule } from '../fabricante/fabricante.module';
import { PecaModule } from '../peca/peca.module';
import { ProblemaModule } from '../problema/problema.module';
import { ProdutoModule } from '../produto/produto.module';
import { ServicoModule } from '../servico/servico.module';
import { VendaModule } from '../venda/venda.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    AparelhoModule,
    ClienteModule,
    FabricanteModule,
    PecaModule,
    ProblemaModule,
    ProdutoModule,
    ServicoModule,
    VendaModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
