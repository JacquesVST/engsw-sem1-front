import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../model/venda.model';
import { VendaDTO } from '../model/vendaDTO.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  public path: string = 'http://localhost:3000/venda';

  constructor(private http: HttpClient) { }

  public listarVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.path}/listar`,);
  }

  public buscarVenda(id: string): Observable<Venda> {
    return this.http.get<Venda>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarVenda(venda: VendaDTO): Observable<Venda> {
    return this.http.post<Venda>(`${this.path}/registrar`, venda);
  }

  public alterarVenda(venda: VendaDTO): Observable<Venda> {
    return this.http.put<Venda>(`${this.path}/alterar/${venda._id}`, venda);
  }

  public deletarVenda(venda: VendaDTO): Observable<Venda> {
    return this.http.delete<Venda>(`${this.path}/deletar/${venda._id}`);
  }


}
