import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { Cliente } from '../shared/model/cliente.model';
import { ClienteService } from '../shared/service/cliente.service';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.css']
})
export class ListagemClientesComponent implements OnInit {


  public clientes: Cliente[] = [];
  public dados: MatTableDataSource<Cliente>;
  public clienteSelecionado: Cliente = new Cliente();
  public displayedColumns: string[] = ['nome', 'cpf', 'email', 'dataNascimento', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  public listarClientes(): void {
    this.clienteService.listarClientes()
      .subscribe(response => {
        this.clientes = response['clientes'];
        this.dados = new MatTableDataSource(this.clientes);
      }, (err) => {
        let erro = this.snackBar.open('Erro ao listar clientes');
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dados.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(cliente: Cliente = new Cliente()) {
    const dialogRef = this.dialogService.openDialogCliente(cliente);

    dialogRef.afterClosed().subscribe(() => {
      this.listarClientes
    });
  }

}
