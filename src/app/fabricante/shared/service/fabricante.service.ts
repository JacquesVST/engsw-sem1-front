import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from '../model/fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {
  public path: string = 'http://localhost:3000/fabricante';

  constructor(private http: HttpClient) { }

  public listarFabricantes(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(`${this.path}/listar`,);
  }

  public buscarFabricante(id: string): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.path}/registrar`, fabricante);
  }

  public alterarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.put<Fabricante>(`${this.path}/alterar/${fabricante._id}`, fabricante);
  }

  public deletarFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.delete<Fabricante>(`${this.path}/deletar/${fabricante._id}`);
  }


}
