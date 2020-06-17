import { Servico } from './servico.model';

export class HistoricoSituacao {
  public _id: string;
  public servico: Servico = new Servico();
  public data: Date;
  public situacao: string;
  public observacao: string;
}
