import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GerirServicoComponent } from './gerir-servico/gerir-servico.component';
import { ListagemServicosComponent } from './listagem-servicos/listagem-servicos.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ListagemServicosComponent, GerirServicoComponent],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterModule,
    MatDividerModule,
    MatTooltipModule,
    MatTabsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ListagemServicosComponent
  ]
})
export class ServicoModule { }
