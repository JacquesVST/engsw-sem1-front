import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Problema } from '../shared/model/problema.model';
import { ProblemaService } from '../shared/service/problema.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gerir-problema',
  templateUrl: './gerir-problema.component.html',
  styleUrls: ['./gerir-problema.component.css']
})
export class GerirProblemaComponent implements OnInit {

  public problemaAlterado: Problema = new Problema();
  public modoCadastro: boolean;
  public novoProcedimento: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public problema: Problema,
    private problemaService: ProblemaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirProblemaComponent>) { }

  ngOnInit(): void {
    if (!this.problema._id) {
      this.modoCadastro = true;
    }
    this.problemaAlterado = { ...this.problema }
  }

  public cadastrarProblema(): void {
    this.problemaService.cadastrarProblema(this.problemaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar problema');
      });
  }

  public alterarProblema(): void {
    this.problemaService.alterarProblema(this.problemaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do problema');
      });
  }

  public deletarProblema(): void {
    this.problemaService.deletarProblema(this.problema)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir problema');
      });
  }

  public adicionarProcedimento(): void {
    this.problemaAlterado.procedimentos.push(this.novoProcedimento);
  }

  public removerProcedimento(procedimento: string): void {
    const index = this.problemaAlterado.procedimentos.indexOf(procedimento);
    this.problemaAlterado.procedimentos.splice(index, 1);
  }

  public fechar(): void {
    this.dialogRef.close();
  }

}
