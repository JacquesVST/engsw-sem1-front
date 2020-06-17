import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClientesComponent } from './cliente/listagem-clientes/listagem-clientes.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ListagemFabricantesComponent } from './fabricante/listagem-fabricantes/listagem-fabricantes.component';
import { ListagemAparelhosComponent } from './aparelho/listagem-aparelhos/listagem-aparelhos.component';
import { ListagemProblemasComponent } from './problema/listagem-problemas/listagem-problemas.component';
import { ListagemServicosComponent } from './servico/listagem-servicos/listagem-servicos.component';
import { ListagemPecasComponent } from './peca/listagem-pecas/listagem-pecas.component';
import { ListagemProdutosComponent } from './produto/listagem-produtos/listagem-produtos.component';
import { ListagemVendasComponent } from './venda/listagem-vendas/listagem-vendas.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'cliente', component: ListagemClientesComponent },
  { path: 'fabricante', component: ListagemFabricantesComponent },
  { path: 'aparelho', component: ListagemAparelhosComponent },
  { path: 'problema', component: ListagemProblemasComponent },
  { path: 'servico', component: ListagemServicosComponent },
  { path: 'peca', component: ListagemPecasComponent },
  { path: 'produto', component: ListagemProdutosComponent },
  { path: 'venda', component: ListagemVendasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
