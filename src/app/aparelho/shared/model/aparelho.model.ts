import { Fabricante } from 'src/app/fabricante/shared/model/fabricante.model';

export class Aparelho{
  public _id: string;
  public nome: string;
  public modelo: string;
  public fabricante: Fabricante = new Fabricante();
  public fichaTecnica: string;
  public siteOficial: string;
  public observacao: string;
}
