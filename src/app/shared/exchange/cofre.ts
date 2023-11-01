import { Status } from "./status";

export interface Cofre {
  id: string;
  nome: string;
  valor: string;
  objetivo: string;
  progresso: string;
  status: Status;
}
// TODO: Alterar o funcionamento do Valor
// TODO: Adicionar moeda
