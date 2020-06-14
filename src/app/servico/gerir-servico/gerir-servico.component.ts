import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GerirAparelhoComponent } from 'src/app/aparelho/gerir-aparelho/gerir-aparelho.component';
import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { AparelhoService } from 'src/app/aparelho/shared/service/aparelho.service';
import { GerirClienteComponent } from 'src/app/cliente/gerir-cliente/gerir-cliente.component';
import { Cliente } from 'src/app/cliente/shared/model/cliente.model';
import { ClienteService } from 'src/app/cliente/shared/service/cliente.service';
import { GerirProblemaComponent } from 'src/app/problema/gerir-problema/gerir-problema.component';
import { Problema } from 'src/app/problema/shared/model/problema.model';
import { ProblemaService } from 'src/app/problema/shared/service/problema.service';
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

  public openDialogCliente(idCliente: string = null): void {
    if (idCliente) {
      this.clienteService.buscarCliente(idCliente)
        .subscribe(response => {
          const dialogRef = this.dialog.open(GerirClienteComponent, { data: response['cliente'] });

          dialogRef.afterClosed().subscribe(() => {
            this.listarClientes();
          });
        });
    } else {
      const dialogRef = this.dialog.open(GerirClienteComponent, { data: new Cliente() });

      dialogRef.afterClosed().subscribe(() => {
        this.listarClientes();
      });
    }
  }

  public openDialogAparelho(idAparelho: string = null): void {
    if (idAparelho) {
      this.aparelhoService.buscarAparelho(idAparelho)
        .subscribe(response => {
          const dialogRef = this.dialog.open(GerirAparelhoComponent, { data: response['aparelho'] });

          dialogRef.afterClosed().subscribe(() => {
            this.listarAparelhos();
          });
        });
    } else {
      const dialogRef = this.dialog.open(GerirAparelhoComponent, { data: new Aparelho() });

      dialogRef.afterClosed().subscribe(() => {
        this.listarAparelhos();
      });
    }
  }

  public openDialogProblema(idProblema: string = null): void {
    if (idProblema) {
      this.problemaService.buscarProblema(idProblema)
        .subscribe(response => {
          const dialogRef = this.dialog.open(GerirProblemaComponent, { data: response['problema'] });

          dialogRef.afterClosed().subscribe(() => {
            this.listarProblemas();
          });
        });
    } else {
      const dialogRef = this.dialog.open(GerirProblemaComponent, { data: new Problema() });

      dialogRef.afterClosed().subscribe(() => {
        this.listarProblemas();
      });
    }
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
