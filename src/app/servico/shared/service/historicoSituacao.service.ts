import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricoSituacao } from '../model/historicosituacao.model';
import { HistoricoSituacaoDTO } from '../model/historicosituacaoDTO.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoSituacaoService {
  public path: string = 'http://localhost:3000/historico-situacao';

  constructor(private http: HttpClient) { }

  public listarHistoricoSituacaos(): Observable<HistoricoSituacao[]> {
    return this.http.get<HistoricoSituacao[]>(`${this.path}/listar`,);
  }

  public buscarHistoricoSituacao(id: string): Observable<HistoricoSituacao> {
    return this.http.get<HistoricoSituacao>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarHistoricoSituacao(historicosituacao: HistoricoSituacaoDTO): Observable<HistoricoSituacao> {
    return this.http.post<HistoricoSituacao>(`${this.path}/registrar`, historicosituacao);
  }

  public alterarHistoricoSituacao(historicosituacao: HistoricoSituacaoDTO): Observable<HistoricoSituacao> {
    return this.http.put<HistoricoSituacao>(`${this.path}/alterar/${historicosituacao._id}`, historicosituacao);
  }

  public deletarHistoricoSituacao(historicosituacao: HistoricoSituacaoDTO): Observable<HistoricoSituacao> {
    return this.http.delete<HistoricoSituacao>(`${this.path}/deletar/${historicosituacao._id}`);
  }

  public filtrarHistoricoSituacao(filtro: any = {}, ordem: any = {}): Observable<HistoricoSituacao[]> {
    return this.http.get<HistoricoSituacao[]>(`${this.path}/filtrar/?filtro=${encodeURIComponent( JSON.stringify(filtro))}`);
  }


}
