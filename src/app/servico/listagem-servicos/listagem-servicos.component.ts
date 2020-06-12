import { Component, OnInit } from '@angular/core';
import { Servico } from '../shared/model/servico.model';
import { ServicoService } from '../shared/service/servico.service';
import { MatDialog } from '@angular/material/dialog';
import { GerirServicoComponent } from '../gerir-servico/gerir-servico.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-servicos',
  templateUrl: './listagem-servicos.component.html',
  styleUrls: ['./listagem-servicos.component.css']
})
export class ListagemServicosComponent implements OnInit {

  public servicos: Servico[] = [];
  public dados: MatTableDataSource<Servico>;
  public servicoSelecionado: Servico = new Servico();
  public displayedColumns: string[] = ['cliente', 'aparelho', 'situacao', 'valor', 'dataRegistro', 'acoes'];

  constructor(
    private servicoService: ServicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarServicos();
  }

  public listarServicos(): void {
    this.servicoService.listarServicos()
      .subscribe(response => {
        console.log(response)
        this.servicos = response['servicos'];
        this.dados = new MatTableDataSource(this.servicos);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar servicos');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(servico: Servico = new Servico()) {
    const dialogRef = this.dialog.open(GerirServicoComponent, { data: servico });

    dialogRef.afterClosed().subscribe(() => {
      this.listarServicos();
    });
  }

}
