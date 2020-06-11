import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Problema } from '../model/problema.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemaService {
  public path: string = 'http://localhost:3000/problema';

  constructor(private http: HttpClient) { }

  public listarProblemas(): Observable<Problema[]> {
    return this.http.get<Problema[]>(`${this.path}/listar`,);
  }

  public buscarProblema(id: string): Observable<Problema> {
    return this.http.get<Problema>(`${this.path}/buscar/${id}`,);
  }

  public cadastrarProblema(problema: Problema): Observable<Problema> {
    return this.http.post<Problema>(`${this.path}/registrar`, problema);
  }

  public alterarProblema(problema: Problema): Observable<Problema> {
    return this.http.put<Problema>(`${this.path}/alterar/${problema._id}`, problema);
  }

  public deletarProblema(problema: Problema): Observable<Problema> {
    return this.http.delete<Problema>(`${this.path}/deletar/${problema._id}`);
  }


}
