import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../shared/model/cliente.model';
import { ClienteService } from '../shared/service/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gerir-cliente',
  templateUrl: './gerir-cliente.component.html',
  styleUrls: ['./gerir-cliente.component.css']
})
export class GerirClienteComponent implements OnInit {

  public clienteAlterado: Cliente = new Cliente();
  public modoCadastro: boolean;
  public maskTelefone = '(00)00000-0000';
  public maskCPF = '000.000.000-00';

  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirClienteComponent>) { }

  ngOnInit(): void {
    if(!this.cliente._id){
      this.modoCadastro = true;
    }
    this.clienteAlterado = {...this.cliente}
  }

  public cadastrarCliente(): void {
    this.clienteAlterado.senha = 'placeholder123'
    this.clienteService.cadastrarCliente(this.clienteAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar cliente');
      });
  }

  public alterarCliente(): void {
    this.clienteService.alterarCliente(this.clienteAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do cliente');
      });
  }

  public deletarCliente(): void {
    this.clienteService.deletarCliente(this.cliente)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir cliente');
      });
  }

  public fechar(): void{
    this.dialogRef.close();
  }

}
