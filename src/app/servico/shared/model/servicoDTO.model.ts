import { Aparelho } from 'src/app/aparelho/shared/model/aparelho.model';
import { Cliente } from 'src/app/cliente/shared/model/cliente.model';
import { Problema } from 'src/app/problema/shared/model/problema.model';

export class ServicoDTO{
  public _id: string;
  public cliente: string;
  public aparelho: string;
  public problema: string;
  public situacao: string;
  public valor: number;
  public dataRegistro: string;
  public observacao: string;
}
