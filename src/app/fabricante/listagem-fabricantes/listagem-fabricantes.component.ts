import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { Fabricante } from '../shared/model/fabricante.model';
import { FabricanteService } from '../shared/service/fabricante.service';

@Component({
  selector: 'app-listagem-fabricantes',
  templateUrl: './listagem-fabricantes.component.html',
  styleUrls: ['./listagem-fabricantes.component.css']
})
export class ListagemFabricantesComponent implements OnInit {

  public fabricantes: Fabricante[] = [];
  public dados: MatTableDataSource<Fabricante>;
  public fabricanteSelecionado: Fabricante = new Fabricante();
  public displayedColumns: string[] = ['nome', 'site', 'contato', 'acoes'];

  constructor(
    private fabricanteService: FabricanteService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarFabricantes();
  }

  public listarFabricantes(): void {
    this.fabricanteService.listarFabricantes()
      .subscribe(response => {
        this.fabricantes = response['fabricantes'];
        this.dados = new MatTableDataSource(this.fabricantes);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar fabricantes');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(fabricante: Fabricante = new Fabricante()) {
    const dialogRef = this.dialogService.openDialogFabricante(fabricante);

    dialogRef.afterClosed().subscribe(() => {
      this.listarFabricantes();
    });
  }

  public obterSite(site: string): string{
    site.replace('http://', '');
    site.replace('https://', '');
    return site;
  }
}
