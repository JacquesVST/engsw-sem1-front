import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';
import { FabricanteService } from 'src/app/fabricante/shared/service/fabricante.service';
import { Servico } from '../shared/model/servico.model';
import { ServicoService } from '../shared/service/servico.service';
import { ServicoDTO } from '../shared/model/servicoDTO.model';
import { GerirFabricanteComponent } from 'src/app/fabricante/gerir-fabricante/gerir-fabricante.component';
import { AparelhoService } from 'src/app/aparelho/shared/service/aparelho.service';
import { ClienteService } from 'src/app/cliente/shared/service/cliente.service';
import { ProblemaService } from 'src/app/problema/shared/service/problema.service';
import { Cliente } from 'src/app/cliente/shared/model/cliente.model';
import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { Problema } from 'src/app/problema/shared/model/problema.model';
import { GerirClienteComponent } from 'src/app/cliente/gerir-cliente/gerir-cliente.component';
import { GerirAparelhoComponent } from 'src/app/aparelho/gerir-aparelho/gerir-aparelho.component';
import { GerirProblemaComponent } from 'src/app/problema/gerir-problema/gerir-problema.component';

@Component({
  selector: 'app-gerir-servico',
  templateUrl: './gerir-servico.component.html',
  styleUrls: ['./gerir-servico.component.css']
})
export class GerirServicoComponent implements OnInit {

  public clientes: Cliente[] = [];
  public aparelhos: Aparelho[] = [];
  public problemas: Problema[] = [];
  public servicoAlterado: ServicoDTO = new ServicoDTO();
  public modoCadastro: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public servico: Servico,
    private servicoService: ServicoService,
    private clienteService: ClienteService,
    private aparelhoService: AparelhoService,
    private problemaService: ProblemaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GerirServicoComponent>) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarAparelhos();
    this.listarProblemas();
    if (!this.servico._id) {
      this.modoCadastro = true;
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

  public openDialogCliente(cliente: any = new Cliente()): void {
    this.clienteService.buscarCliente(cliente)
      .subscribe(response => {
        cliente = response['cliente'];
      }, () => {
        cliente = new Cliente();
      }).add(() => {
        const dialogRef = this.dialog.open(GerirClienteComponent, { data: cliente });

        dialogRef.afterClosed().subscribe(() => {
          this.listarClientes();
        });
      });
  }

  public openDialogAparelho(aparelho: any = new Aparelho()): void {
    this.aparelhoService.buscarAparelho(aparelho)
      .subscribe(response => {
        aparelho = response['aparelho'];
      }, () => {
        aparelho = new Problema();
      }).add(() => {
        const dialogRef = this.dialog.open(GerirAparelhoComponent, { data: aparelho });

        dialogRef.afterClosed().subscribe(() => {
          this.listarAparelhos();
        });
      });
  }

  public openDialogProblema(problema: any = new Problema()): void {
    this.problemaService.buscarProblema(problema)
      .subscribe(response => {
        problema = response['problema'];
      }, () => {
        problema = new Problema();
      }).add(() => {
        const dialogRef = this.dialog.open(GerirProblemaComponent, { data: problema });

        dialogRef.afterClosed().subscribe(() => {
          this.listarProblemas();
        });
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
