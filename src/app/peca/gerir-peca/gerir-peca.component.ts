import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';
import { FabricanteService } from 'src/app/fabricante/shared/service/fabricante.service';
import { Servico } from 'src/app/servico/shared/model/servico.model';
import { ServicoService } from 'src/app/servico/shared/service/servico.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { Peca } from '../shared/model/peca.model';
import { PecaDTO } from '../shared/model/pecaDTO.model';
import { PecaService } from '../shared/service/peca.service';
// import { GerirServicoComponent } from 'src/app/servico/gerir-servico/gerir-servico.component';

@Component({
  selector: 'app-gerir-peca',
  templateUrl: './gerir-peca.component.html',
  styleUrls: ['./gerir-peca.component.css']
})
export class GerirPecaComponent implements OnInit {

  public fabricantes: Fabricante[] = [];
  public servicos: Servico[] = [];
  public pecaAlterado: PecaDTO = new PecaDTO();
  public modoCadastro: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public peca: Peca,
    private pecaService: PecaService,
    private fabricanteService: FabricanteService,
    private servicoService: ServicoService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirPecaComponent>) { }

  ngOnInit(): void {
    this.listarFabricantes();
    this.listarServicos();
    if (!this.peca._id) {
      this.modoCadastro = true;
    }
    this.pecaAlterado = this.converterPeca(this.peca);
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

  public listarServicos(): void {
    this.servicoService.listarServicos()
      .subscribe(response => {
        this.servicos = response['servicos'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar servicos');
        console.log(err);
      });
  }

  public cadastrarPeca(): void {
    this.pecaService.cadastrarPeca(this.pecaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar peca');
      });
  }

  public alterarPeca(): void {
    this.pecaService.alterarPeca(this.pecaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do peca');
      });
  }

  public deletarPeca(): void {
    this.pecaService.deletarPeca(this.pecaAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir peca');
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
      const dialogRef = this.dialogService.openDialogFabricante();

      dialogRef.afterClosed().subscribe(() => {
        this.listarFabricantes();
      });
    }
  }

  public openDialogServico(idServico: string = null): void {
    if (idServico) {
      this.servicoService.buscarServico(idServico)
        .subscribe(response => {
          const dialogRef = this.dialogService.openDialogServico(response['servico']);

          dialogRef.afterClosed().subscribe(() => {
            this.listarServicos();
          });
        });
    } else {
      const dialogRef = this.dialogService.openDialogServico();

      dialogRef.afterClosed().subscribe(() => {
        this.listarServicos();
      });
    }
  }

  public converterPeca(peca: Peca): PecaDTO {
    const pecaDTO: PecaDTO = new PecaDTO();
    pecaDTO._id = peca._id;
    pecaDTO.descricao = peca.descricao;
    pecaDTO.servico = peca.servico._id;
    pecaDTO.dataPedido = peca.dataPedido;
    pecaDTO.dataChegada = peca.dataChegada;
    pecaDTO.categoria = peca.categoria;
    pecaDTO.origem = peca.origem;
    pecaDTO.fabricante = peca.fabricante._id;
    pecaDTO.valor = peca.valor;
    pecaDTO.observacao = peca.observacao;
    return pecaDTO;
  }

}
