import { Component, OnInit } from '@angular/core';
import { Problema } from '../shared/model/problema.model';
import { ProblemaService } from '../shared/service/problema.service';
import { MatDialog } from '@angular/material/dialog';
import { GerirProblemaComponent } from '../gerir-problema/gerir-problema.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-problemas',
  templateUrl: './listagem-problemas.component.html',
  styleUrls: ['./listagem-problemas.component.css']
})
export class ListagemProblemasComponent implements OnInit {


  public problemas: Problema[] = [];
  public dados: MatTableDataSource<Problema>;
  public problemaSelecionado: Problema = new Problema();
  public displayedColumns: string[] = ['descricao', 'procedimentos', 'observacoes', 'acoes'];

  constructor(
    private problemaService: ProblemaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarProblemas();
  }

  public listarProblemas(): void {
    this.problemaService.listarProblemas()
      .subscribe(response => {
        this.problemas = response['problemas'];
        this.dados = new MatTableDataSource(this.problemas);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar problemas');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(problema: Problema = new Problema()) {
    const dialogRef = this.dialog.open(GerirProblemaComponent, { data: problema });

    dialogRef.afterClosed().subscribe(() => {
      this.listarProblemas();
    });
  }

}
