import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClientesComponent } from './cliente/listagem-clientes/listagem-clientes.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ListagemFabricantesComponent } from './fabricante/listagem-fabricantes/listagem-fabricantes.component';
import { ListagemAparelhosComponent } from './aparelho/listagem-aparelhos/listagem-aparelhos.component';
import { ListagemProblemasComponent } from './problema/listagem-problemas/listagem-problemas.component';
import { ListagemServicosComponent } from './servico/listagem-servicos/listagem-servicos.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'cliente', component: ListagemClientesComponent },
  { path: 'fabricante', component: ListagemFabricantesComponent },
  { path: 'aparelho', component: ListagemAparelhosComponent },
  { path: 'problema', component: ListagemProblemasComponent },
  { path: 'servico', component: ListagemServicosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
