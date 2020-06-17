import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Peca } from '../model/peca.model';
import { PecaDTO } from '../model/pecaDTO.model';

@Injectable({
  providedIn: 'root'
})
export class PecaService {
  public path: string = 'http://localhost:3000/peca';

  constructor(private http: HttpClient) { }

  public listarPecas(): Observable<Peca[]> {
    return this.http.get<Peca[]>(`${this.path}/listar`);
  }

  public buscarPeca(id: string): Observable<Peca> {
    return this.http.get<Peca>(`${this.path}/buscar/${id}`);
  }

  public cadastrarPeca(peca: PecaDTO): Observable<Peca> {
    return this.http.post<Peca>(`${this.path}/registrar`, peca);
  }

  public alterarPeca(peca: PecaDTO): Observable<Peca> {
    return this.http.put<Peca>(`${this.path}/alterar/${peca._id}`, peca);
  }

  public deletarPeca(peca: PecaDTO): Observable<Peca> {
    return this.http.delete<Peca>(`${this.path}/deletar/${peca._id}`);
  }

  public filtrarPecas(filtro: any = {}, ordem: any = {}): Observable<Peca[]> {
    return this.http.get<Peca[]>(`${this.path}/filtrar/?filtro=${encodeURIComponent( JSON.stringify(filtro))}`);
  }


}
