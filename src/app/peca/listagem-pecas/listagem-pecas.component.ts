import { Component, OnInit } from '@angular/core';
import { Peca } from '../shared/model/peca.model';
import { PecaService } from '../shared/service/peca.service';
import { MatDialog } from '@angular/material/dialog';
import { GerirPecaComponent } from '../gerir-peca/gerir-peca.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-pecas',
  templateUrl: './listagem-pecas.component.html',
  styleUrls: ['./listagem-pecas.component.css']
})
export class ListagemPecasComponent implements OnInit {

  public pecas: Peca[] = [];
  public dados: MatTableDataSource<Peca>;
  public pecaSelecionado: Peca = new Peca();
  public displayedColumns: string[] = ['descricao', 'categoria', 'data', 'origem', 'valor', 'acoes'];

  constructor(
    private pecaService: PecaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarPecas();
  }

  public listarPecas(): void {
    this.pecaService.listarPecas()
      .subscribe(response => {
        this.pecas = response['pecas'];
        this.dados = new MatTableDataSource(this.pecas);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar pecas');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(peca: Peca = new Peca()) {
    const dialogRef = this.dialog.open(GerirPecaComponent, { data: peca });

    dialogRef.afterClosed().subscribe(() => {
      this.listarPecas();
    });
  }

  public obterSite(site: string): string {
    site.replace('http://', '');
    site.replace('https://', '');
    return site;
  }

}
