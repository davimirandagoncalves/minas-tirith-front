import { Status } from "./status";

export interface CofreDetail {
  id: string,
  nome: string
  moeda: string
  objetivo: number
  status: string
  transacoes: Transacao[];

  total: number
  progresso: string
}

export interface Transacao {
  id: string,
  valor: string,
  data: string,
  descricao: string
}
