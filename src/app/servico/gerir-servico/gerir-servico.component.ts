import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { AparelhoService } from 'src/app/aparelho/shared/service/aparelho.service';
import { Cliente } from 'src/app/cliente/shared/model/cliente.model';
import { ClienteService } from 'src/app/cliente/shared/service/cliente.service';
import { Peca } from 'src/app/peca/shared/model/peca.model';
import { PecaService } from 'src/app/peca/shared/service/peca.service';
import { Problema } from 'src/app/problema/shared/model/problema.model';
import { ProblemaService } from 'src/app/problema/shared/service/problema.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { Servico } from '../shared/model/servico.model';
import { ServicoDTO } from '../shared/model/servicoDTO.model';
import { ServicoService } from '../shared/service/servico.service';

@Component({
  selector: 'app-gerir-servico',
  templateUrl: './gerir-servico.component.html',
  styleUrls: ['./gerir-servico.component.css']
})
export class GerirServicoComponent implements OnInit {

  public clientes: Cliente[] = [];
  public aparelhos: Aparelho[] = [];
  public problemas: Problema[] = [];
  public situacao: string[] = [];
  public pecas: Peca[] = [];
  public servicoAlterado: ServicoDTO = new ServicoDTO();
  public modoCadastro: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public servico: Servico,
    private servicoService: ServicoService,
    private clienteService: ClienteService,
    private aparelhoService: AparelhoService,
    private problemaService: ProblemaService,
    private pecaService: PecaService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirServicoComponent>
  ) {
    this.situacao = [
      'Solicitado',
      'Em Análise',
      'Aceito',
      'Rejeitado',
      'Aguardando Peças',
      'Iniciado',
      'Em Progresso',
      'Com Impedimento',
      'Aguardando Resposta',
      'Finalizado',
      'Entregue'
    ]
  }

  ngOnInit(): void {
    this.listarClientes();
    this.listarAparelhos();
    this.listarProblemas();
    if (!this.servico._id) {
      this.modoCadastro = true;
    } else {
      this.listarPecas();
    }
    this.servicoAlterado = this.converterServico(this.servico);
  }

  public listarClientes(): void {
    this.clienteService.listarClientes()
      .subscribe(response => {
        this.clientes = response['clientes'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar clientes');
        console.log(err);
      });
  }

  public listarAparelhos(): void {
    this.aparelhoService.listarAparelhos()
      .subscribe(response => {
        this.aparelhos = response['aparelhos'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar aparelhos');
        console.log(err);
      });
  }

  public listarProblemas(): void {
    this.problemaService.listarProblemas()
      .subscribe(response => {
        this.problemas = response['problemas'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar problemas');
        console.log(err);
      });
  }

  public listarPecas(): void {
    this.pecaService.filtrarPecas({ servico: this.servico._id })
      .subscribe(response => {
        this.pecas = response['pecas'];
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar pecas do servico');
        console.log(err);
      });
  }

  public cadastrarServico(): void {
    this.servicoService.cadastrarServico(this.servicoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Cadastrado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro cadastrar serviço');
      });
  }

  public alterarServico(): void {
    this.servicoService.alterarServico(this.servicoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Salvo com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro salvar alterações do serviço');
      });
  }

  public deletarServico(): void {
    this.servicoService.deletarServico(this.servicoAlterado)
      .subscribe(response => {
        this.fechar();
        let sucesso = this.snackBar.open('Deletado com sucesso');
      }, (err) => {
        console.log(err);
        let erro = this.snackBar.open('Erro ao excluir serviço');
      });
  }

  public fechar(): void {
    this.dialogRef.close();
  }

  public openDialogCliente(idCliente: string = null): void {
    if (idCliente) {
      this.clienteService.buscarCliente(idCliente)
        .subscribe(response => {
          const dialogRef = this.dialogService.openDialogCliente(response['cliente']);

          dialogRef.afterClosed().subscribe(() => {
            this.listarClientes();
          });
        });
    } else {
      const dialogRef = this.dialogService.openDialogCliente();

      dialogRef.afterClosed().subscribe(() => {
        this.listarClientes();
      });
    }
  }

  public openDialogAparelho(idAparelho: string = null): void {
    if (idAparelho) {
      this.aparelhoService.buscarAparelho(idAparelho)
        .subscribe(response => {
          const dialogRef = this.dialogService.openDialogAparelho(response['aparelho']);

          dialogRef.afterClosed().subscribe(() => {
            this.listarAparelhos();
          });
        });
    } else {
      const dialogRef = this.dialogService.openDialogAparelho();

      dialogRef.afterClosed().subscribe(() => {
        this.listarAparelhos();
      });
    }
  }

  public openDialogProblema(idProblema: string = null): void {
    if (idProblema) {
      this.problemaService.buscarProblema(idProblema)
        .subscribe(response => {
          const dialogRef = this.dialogService.openDialogProblema(response['problema']);

          dialogRef.afterClosed().subscribe(() => {
            this.listarProblemas();
          });
        });
    } else {
      const dialogRef = this.dialogService.openDialogProblema();

      dialogRef.afterClosed().subscribe(() => {
        this.listarProblemas();
      });
    }
  }

  public openDialogPeca(peca: Peca = new Peca()) {
    const dialogRef = this.dialogService.openDialogPeca(peca);

    dialogRef.afterClosed().subscribe(() => {
      this.listarPecas();
    });

  }

  public converterServico(servico: Servico): ServicoDTO {
    const servicoDTO: ServicoDTO = new ServicoDTO();
    servicoDTO._id = servico._id;
    servicoDTO.cliente = servico.cliente._id;
    servicoDTO.aparelho = servico.aparelho._id;
    servicoDTO.problema = servico.problema._id;
    servicoDTO.situacao = servico.situacao;
    servicoDTO.valor = servico.valor;
    servicoDTO.dataRegistro = servico.dataRegistro;
    servicoDTO.observacao = servico.observacao;
    return servicoDTO;
  }

}
