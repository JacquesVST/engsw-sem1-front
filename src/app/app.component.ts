import { Component } from '@angular/core';
import { GerirAparelhoComponent } from './aparelho/gerir-aparelho/gerir-aparelho.component';
import { GerirClienteComponent } from './cliente/gerir-cliente/gerir-cliente.component';
import { GerirFabricanteComponent } from './fabricante/gerir-fabricante/gerir-fabricante.component';
import { DialogService } from './shared/service/dialog.service';
import { GerirProblemaComponent } from './problema/gerir-problema/gerir-problema.component';
import { GerirServicoComponent } from './servico/gerir-servico/gerir-servico.component';
import { GerirPecaComponent } from './peca/gerir-peca/gerir-peca.component';
import { GerirProdutoComponent } from './produto/gerir-produto/gerir-produto.component';
import { GerirVendaComponent } from './venda/gerir-venda/gerir-venda.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front';

  constructor(private dialogService: DialogService) {
    this.dialogService.setCliente(GerirClienteComponent);
    this.dialogService.setFabricante(GerirFabricanteComponent);
    this.dialogService.setAparelho(GerirAparelhoComponent);
    this.dialogService.setProblema(GerirProblemaComponent);
    this.dialogService.setServico(GerirServicoComponent);
    this.dialogService.setPeca(GerirPecaComponent);
    this.dialogService.setProduto(GerirProdutoComponent);
    this.dialogService.setVenda(GerirVendaComponent);
  }
}
