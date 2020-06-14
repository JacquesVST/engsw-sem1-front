import { Servico } from 'src/app/servico/shared/model/servico.model';
import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';

export class Peca{
  public _id: string;
  public descricao: string;
  public servico: Servico = new Servico();
  public dataPedido: Date;
  public dataChegada: Date;
  public categoria: string;
  public origem: string;
  public fabricante: Fabricante = new Fabricante();
  public valor: number;
  public observacao: string;
}
