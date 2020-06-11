import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aparelho } from '../model/aparelho.model';
import { AparelhoDTO } from '../model/aparelhoDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AparelhoService {
  public path: string = 'http://localhost:3000/aparelho';

  constructor(private http: HttpClient) { }

  public listarAparelhos(): Observable<Aparelho[]> {
    return this.http.get<Aparelho[]>(`${this.path}/listar`,);
  }

  public buscarAparelho(id: string): Observable<Aparelho> {
    return this.http.get<Aparelho>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarAparelho(aparelho: AparelhoDTO): Observable<Aparelho> {
    return this.http.post<Aparelho>(`${this.path}/registrar`, aparelho);
  }

  public alterarAparelho(aparelho: AparelhoDTO): Observable<Aparelho> {
    return this.http.put<Aparelho>(`${this.path}/alterar/${aparelho._id}`, aparelho);
  }

  public deletarAparelho(aparelho: AparelhoDTO): Observable<Aparelho> {
    return this.http.delete<Aparelho>(`${this.path}/deletar/${aparelho._id}`);
  }


}
