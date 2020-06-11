import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public path: string = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) { }

  public listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.path}/listar`,);
  }

  public buscarCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.path}/registrar`, cliente);
  }

  public alterarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.path}/alterar/${cliente._id}`, cliente);
  }

  public deletarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.path}/deletar/${cliente._id}`);
  }


}
