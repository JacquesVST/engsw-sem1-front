import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { Cliente } from './cliente.model';

export class AparelhoCliente {
  public _id: string;
  public nome: string;
  public modelo: string;
  public aparelho: Aparelho = new Aparelho();
  public cliente: Cliente = new Cliente();
  public dataAquisicao: Date;
  public observacao: string;
}
