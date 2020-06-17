import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';
import { FabricanteService } from 'src/app/fabricante/shared/service/fabricante.service';
import { Aparelho } from '../shared/model/aparelho.model';
import { AparelhoService } from '../shared/service/aparelho.service';
import { AparelhoDTO } from '../shared/model/aparelhoDTO.model';
import { GerirFabricanteComponent } from 'src/app/fabricante/gerir-fabricante/gerir-fabricante.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-gerir-aparelho',
  templateUrl: './gerir-aparelho.component.html',
  styleUrls: ['./gerir-aparelho.component.css']
})
export class GerirAparelhoComponent implements OnInit {

  public fabricantes: Fabricante[] = [];
  public aparelhoAlterado: AparelhoDTO = new AparelhoDTO();
  public modoCadastro: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public aparelho: Aparelho,
    private aparelhoService: AparelhoService,
    private fabricanteService: FabricanteService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirAparelhoComponent>) { }

  ngOnInit(): void {
    this.listarFabricantes();
    if (!this.aparelho._id) {
      this.modoCadastro = true;
    }
    this.aparelhoAlterado = this.converterAparelho(this.aparelho);
  }

  public listarFabricantes(): void {
    this.fabricanteService.listarFabricantes()
      .subscribe(response => {
        this.fabricantes = response['fabricantes'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar fabricantes');
        console.log(err);
      });
  }

  public cadastrarAparelho(): void {
    this.aparelhoService.cadastrarAparelho(this.aparelhoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar aparelho');
      });
  }

  public alterarAparelho(): void {
    this.aparelhoService.alterarAparelho(this.aparelhoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do aparelho');
      });
  }

  public deletarAparelho(): void {
    this.aparelhoService.deletarAparelho(this.aparelhoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir aparelho');
      });
  }

  public fechar(): void {
    this.dialogRef.close();
  }

  public openDialogFabricante(idFabricante: string = null): void {
    if (idFabricante) {
      this.fabricanteService.buscarFabricante(idFabricante)
        .subscribe(response => {
          const dialogRef = this.dialogService.openDialogFabricante(response['fabricante']);

          dialogRef.afterClosed().subscribe(() => {
            this.listarFabricantes();
          });
        });
    } else {
      const dialogRef = this.dialogService.openDialogFabricante()

      dialogRef.afterClosed().subscribe(() => {
        this.listarFabricantes();
      });
    }
  }

  public converterAparelho(aparelho: Aparelho): AparelhoDTO {
    const aparelhoDTO: AparelhoDTO = new AparelhoDTO();
    aparelhoDTO._id = aparelho._id;
    aparelhoDTO.nome = aparelho.nome;
    aparelhoDTO.modelo = aparelho.modelo;
    aparelhoDTO.fabricante = aparelho.fabricante._id;
    aparelhoDTO.fichaTecnica = aparelho.fichaTecnica;
    aparelhoDTO.siteOficial = aparelho.siteOficial;
    aparelhoDTO.observacao = aparelho.observacao;
    return aparelhoDTO;
  }

}
