import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { Cliente } from 'src/app/cliente/shared/model/cliente.model';
import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';
import { Peca } from 'src/app/peca/shared/model/peca.model';
import { Problema } from 'src/app/problema/shared/model/problema.model';
import { Produto } from 'src/app/produto/shared/model/produto.model';
import { Servico } from 'src/app/servico/shared/model/servico.model';
import { Venda } from 'src/app/venda/shared/model/venda.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private gerirClienteComponent: any;
  private gerirFabricanteComponent: any;
  private gerirAparelhoComponent: any;
  private gerirProblemaComponent: any;
  private gerirServicoComponent: any;
  private gerirPecaComponent: any;
  private gerirProdutoComponent: any;
  private gerirVendaComponent: any;

  public setCliente(cliente: any){
    this.gerirClienteComponent = cliente;
  }

  public setFabricante(fabricante: any){
    this.gerirFabricanteComponent = fabricante;
  }

  public setAparelho(aparelho: any){
    this.gerirAparelhoComponent = aparelho;
  }

  public setProblema(problema: any){
    this.gerirProblemaComponent = problema;
  }

  public setServico(servico: any){
    this.gerirServicoComponent = servico;
  }

  public setPeca(peca: any){
    this.gerirPecaComponent = peca;
  }

  public setProduto(produto: any){
    this.gerirProdutoComponent = produto;
  }

  public setVenda(venda: any){
    this.gerirVendaComponent = venda;
  }

  constructor(private dialog: MatDialog,) { }

  public openDialogCliente(cliente: Cliente = new Cliente()): any {
    return this.dialog.open(this.gerirClienteComponent, { data: cliente });
  }

  public openDialogFabricante(fabricante: Fabricante = new Fabricante()): any {
    return this.dialog.open(this.gerirFabricanteComponent, { data: fabricante });
  }

  public openDialogAparelho(aparelho: Aparelho = new Aparelho()): any {
    return this.dialog.open(this.gerirAparelhoComponent, { data: aparelho });
  }

  public openDialogProblema(problema: Problema = new Problema()): any {
    return this.dialog.open(this.gerirProblemaComponent, { data: problema });
  }

  public openDialogServico(servico: Servico = new Servico()): any {
    return this.dialog.open(this.gerirServicoComponent, { data: servico });
  }

  public openDialogPeca(peca: Peca = new Peca()): any {
    return this.dialog.open(this.gerirPecaComponent, { data: peca });
  }

  public openDialogProduto(produto: Produto = new Produto()): any {
    return this.dialog.open(this.gerirProdutoComponent, { data: produto });
  }

  public openDialogVenda(venda: Venda = new Venda()): any {
    return this.dialog.open(this.gerirVendaComponent, { data: venda });
  }

}
