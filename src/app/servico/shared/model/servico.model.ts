import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { Cliente } from 'src/app/cliente/shared/model/cliente.model';
import { Problema } from 'src/app/problema/shared/model/problema.model';

export class Servico{
  public _id: string;
  public cliente: Cliente = new Cliente();
  public aparelho: Aparelho = new Aparelho();
  public problema: Problema = new Problema();
  public situacao: string;
  public valor: number;
  public dataRegistro: string;
  public observacao: string;
}
