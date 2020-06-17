import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { Venda } from '../shared/model/venda.model';
import { VendaService } from '../shared/service/venda.service';

@Component({
  selector: 'app-listagem-vendas',
  templateUrl: './listagem-vendas.component.html',
  styleUrls: ['./listagem-vendas.component.css']
})
export class ListagemVendasComponent implements OnInit {

  public vendas: Venda[] = [];
  public dados: MatTableDataSource<Venda>;
  public vendaSelecionado: Venda = new Venda();
  public displayedColumns: string[] = ['produto', 'data', 'valor', 'quantidade', 'acoes'];

  constructor(
    private vendaService: VendaService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarVendas();
  }

  public listarVendas(): void {
    this.vendaService.listarVendas()
      .subscribe(response => {
        this.vendas = response['vendas'];
        this.dados = new MatTableDataSource(this.vendas);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar vendas');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(venda: Venda = new Venda()) {
    const dialogRef = this.dialogService.openDialogVenda(venda);

    dialogRef.afterClosed().subscribe(() => {
      this.listarVendas();
    });
  }

  public obterSite(site: string): string {
    site.replace('http://', '');
    site.replace('https://', '');
    return site;
  }

}
