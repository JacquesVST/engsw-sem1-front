import { Component, OnInit } from '@angular/core';
import { Aparelho } from '../shared/model/aparelho.model';
import { AparelhoService } from '../shared/service/aparelho.service';
import { MatDialog } from '@angular/material/dialog';
import { GerirAparelhoComponent } from '../gerir-aparelho/gerir-aparelho.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listagem-aparelhos',
  templateUrl: './listagem-aparelhos.component.html',
  styleUrls: ['./listagem-aparelhos.component.css']
})
export class ListagemAparelhosComponent implements OnInit {

  public aparelhos: Aparelho[] = [];
  public dados: MatTableDataSource<Aparelho>;
  public aparelhoSelecionado: Aparelho = new Aparelho();
  public displayedColumns: string[] = ['nome', 'modelo', 'fabricante','fichaTecnica', 'acoes'];

  constructor(
    private aparelhoService: AparelhoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarAparelhos();
  }

  public listarAparelhos(): void {
    this.aparelhoService.listarAparelhos()
      .subscribe(response => {
        this.aparelhos = response['aparelhos'];
        this.dados = new MatTableDataSource(this.aparelhos);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar aparelhos');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(aparelho: Aparelho = new Aparelho()) {
    const dialogRef = this.dialog.open(GerirAparelhoComponent, { data: aparelho });

    dialogRef.afterClosed().subscribe(() => {
      this.listarAparelhos();
    });
  }

}
