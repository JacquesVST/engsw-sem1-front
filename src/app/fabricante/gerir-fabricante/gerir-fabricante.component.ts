import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fabricante } from '../shared/model/fabricante.model';
import { FabricanteService } from '../shared/service/fabricante.service';

@Component({
  selector: 'app-gerir-fabricante',
  templateUrl: './gerir-fabricante.component.html',
  styleUrls: ['./gerir-fabricante.component.css']
})
export class GerirFabricanteComponent implements OnInit {

  public fabricanteAlterado: Fabricante = new Fabricante();
  public modoCadastro: boolean;
  public maskTelefone = '(00)00000-0000';
  public maskCPF = '000.000.000-00';

  constructor(
    @Inject(MAT_DIALOG_DATA) public fabricante: Fabricante,
    private fabricanteService: FabricanteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirFabricanteComponent>) { }

  ngOnInit(): void {
    if (!this.fabricante._id) {
      this.modoCadastro = true;
    }
    this.fabricanteAlterado = { ...this.fabricante }
  }

  public cadastrarFabricante(): void {
    this.fabricanteService.cadastrarFabricante(this.fabricanteAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar fabricante');
      });
  }

  public alterarFabricante(): void {
    this.fabricanteService.alterarFabricante(this.fabricanteAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do fabricante');
      });
  }

  public deletarFabricante(): void {
    this.fabricanteService.deletarFabricante(this.fabricante)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir fabricante');
      });
  }

  public fechar(): void {
    this.dialogRef.close();
  }

}
