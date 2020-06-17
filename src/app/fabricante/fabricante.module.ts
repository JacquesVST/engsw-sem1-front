import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { GerirFabricanteComponent } from './gerir-fabricante/gerir-fabricante.component';
import { ListagemFabricantesComponent } from './listagem-fabricantes/listagem-fabricantes.component';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [ListagemFabricantesComponent, GerirFabricanteComponent],
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
    RouterModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ListagemFabricantesComponent
  ]
})
export class FabricanteModule { }
