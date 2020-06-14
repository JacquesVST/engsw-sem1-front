import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  public path: string = 'http://localhost:3000/produto';

  constructor(private http: HttpClient) { }

  public listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.path}/listar`,);
  }

  public buscarProduto(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.path}/registrar`, produto);
  }

  public alterarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.path}/alterar/${produto._id}`, produto);
  }

  public deletarProduto(produto: Produto): Observable<Produto> {
    return this.http.delete<Produto>(`${this.path}/deletar/${produto._id}`);
  }


}
