import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../model/servico.model';
import { ServicoDTO } from '../model/servicoDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  public path: string = 'http://localhost:3000/servico';

  constructor(private http: HttpClient) { }

  public listarServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.path}/listar`,);
  }

  public buscarServico(id: string): Observable<Servico> {
    return this.http.get<Servico>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarServico(servico: ServicoDTO): Observable<Servico> {
    return this.http.post<Servico>(`${this.path}/registrar`, servico);
  }

  public alterarServico(servico: ServicoDTO): Observable<Servico> {
    return this.http.put<Servico>(`${this.path}/alterar/${servico._id}`, servico);
  }

  public deletarServico(servico: ServicoDTO): Observable<Servico> {
    return this.http.delete<Servico>(`${this.path}/deletar/${servico._id}`);
  }


}
