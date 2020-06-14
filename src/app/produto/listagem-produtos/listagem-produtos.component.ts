import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GerirProdutoComponent } from '../gerir-produto/gerir-produto.component';
import { Produto } from '../shared/model/produto.model';
import { ProdutoService } from '../shared/service/produto.service';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {

  public produtos: Produto[] = [];
  public dados: MatTableDataSource<Produto>;
  public produtoSelecionado: Produto = new Produto();
  public displayedColumns: string[] = ['descricao', 'categoria', 'data', 'custo', 'preco', 'estoque', 'acoes'];

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarProdutos();
  }

  public listarProdutos(): void {
    this.produtoService.listarProdutos()
      .subscribe(response => {
        this.produtos = response['produtos'];
        this.dados = new MatTableDataSource(this.produtos);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar produtos');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(produto: Produto = new Produto()) {
    const dialogRef = this.dialog.open(GerirProdutoComponent, { data: produto });

    dialogRef.afterClosed().subscribe(() => {
      this.listarProdutos();
    });
  }

}
