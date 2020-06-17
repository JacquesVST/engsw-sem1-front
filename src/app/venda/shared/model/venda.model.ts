import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';
import { Produto } from 'src/app/produto/shared/model/produto.model';

export class Venda{
  public _id: string;
  public produto: Produto = new Produto();
  public data: Date;
  public valor: number;
  public quantidade: number;
  public observacao: string;
}
