import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../shared/model/produto.model';
import { ProdutoService } from '../shared/service/produto.service';

@Component({
  selector: 'app-gerir-produto',
  templateUrl: './gerir-produto.component.html',
  styleUrls: ['./gerir-produto.component.css']
})
export class GerirProdutoComponent implements OnInit {

  public produtoAlterado: Produto = new Produto();
  public categorias: string[] = [];
  public modoCadastro: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public produto: Produto,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirProdutoComponent>
  ) {
    this.categorias = [
      'Acessórios',
      'Áudio',
      'Cabos',
      'Capas',
      'Carregadores',
      'Películas',
      'Suportes',
      'Outro'
    ]
  }

  ngOnInit(): void {
    if (!this.produto._id) {
      this.modoCadastro = true;
    }
  }

  public cadastrarProduto(): void {
    this.produtoService.cadastrarProduto(this.produtoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar produto');
      });
  }

  public alterarProduto(): void {
    this.produtoService.alterarProduto(this.produtoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do produto');
      });
  }

  public deletarProduto(): void {
    this.produtoService.deletarProduto(this.produtoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir produto');
      });
  }

  public fechar(): void {
    this.dialogRef.close();
  }

}
