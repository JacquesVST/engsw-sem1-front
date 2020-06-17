import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { GerirProblemaComponent } from './gerir-problema/gerir-problema.component';
import { ListagemProblemasComponent } from './listagem-problemas/listagem-problemas.component';
@NgModule({
  declarations: [ListagemProblemasComponent, GerirProblemaComponent],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ListagemProblemasComponent
  ]
})
export class ProblemaModule { }
