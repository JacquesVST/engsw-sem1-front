import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import { FabricanteModule } from './fabricante/fabricante.module';
import { AparelhoModule } from './aparelho/aparelho.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { registerLocaleData } from '@angular/common';
import { ProblemaModule } from './problema/problema.module';
import { PecaModule } from './peca/peca.module';
import { ProdutoModule } from './produto/produto.module';
import localePt from '@angular/common/locales/pt';
import { ServicoModule } from './servico/servico.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClienteModule,
    FabricanteModule,
    AparelhoModule,
    ProblemaModule,
    ServicoModule,
    PecaModule,
    ProdutoModule,
    DashboardModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
