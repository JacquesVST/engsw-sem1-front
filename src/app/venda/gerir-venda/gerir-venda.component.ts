import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from 'src/app/produto/shared/model/produto.model';
import { ProdutoService } from 'src/app/produto/shared/service/produto.service';
import { Venda } from '../shared/model/venda.model';
import { VendaService } from '../shared/service/venda.service';
import { VendaDTO } from '../shared/model/vendaDTO.model';
import { GerirProdutoComponent } from 'src/app/produto/gerir-produto/gerir-produto.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-gerir-venda',
  templateUrl: './gerir-venda.component.html',
  styleUrls: ['./gerir-venda.component.css']
})
export class GerirVendaComponent implements OnInit {

  public produtos: Produto[] = [];
  public vendaAlterado: VendaDTO = new VendaDTO();
  public modoCadastro: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public venda: Venda,
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirVendaComponent>) { }

  ngOnInit(): void {
    this.listarProdutos();
    if (!this.venda._id) {
      this.modoCadastro = true;
    }
    this.vendaAlterado = this.converterVenda(this.venda);
  }

  public listarProdutos(): void {
    this.produtoService.listarProdutos()
      .subscribe(response => {
        this.produtos = response['produtos'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar produtos');
        console.log(err);
      });
  }

  public cadastrarVenda(): void {
    this.vendaService.cadastrarVenda(this.vendaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar venda');
      });
  }

  public alterarVenda(): void {
    this.vendaService.alterarVenda(this.vendaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do venda');
      });
  }

  public deletarVenda(): void {
    this.vendaService.deletarVenda(this.vendaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir venda');
      });
  }

  public fechar(): void {
    this.dialogRef.close();
  }

  public openDialogProduto(idProduto: string = null): void {
    if (idProduto) {
      this.produtoService.buscarProduto(idProduto)
        .subscribe(response => {
          const dialogRef = this.dialogService.openDialogProduto(response['produto']);

          dialogRef.afterClosed().subscribe(() => {
            this.listarProdutos();
          });
        });
    } else {
      const dialogRef = this.dialogService.openDialogProduto();

      dialogRef.afterClosed().subscribe(() => {
        this.listarProdutos();
      });
    }
  }

  public converterVenda(venda: Venda): VendaDTO {
    const vendaDTO: VendaDTO = new VendaDTO();
    vendaDTO._id = venda._id;
    vendaDTO.produto = venda.produto._id;
    vendaDTO.data = venda.data;
    vendaDTO.valor = venda.valor;
    vendaDTO.quantidade = venda.quantidade;
    vendaDTO.observacao = venda.observacao;
    return vendaDTO;
  }

}
