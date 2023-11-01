import { Cofre } from '../shared/exchange/cofre';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { CofreDetail } from 'src/app/shared/exchange/cofre-detail';
import { Status } from 'src/app/shared/exchange/status';
import { TransacaoDetail } from 'src/app/shared/exchange/transacao-detail';

@Injectable()
export class CofreService {

  private _blockEmitter$: Subject<boolean> = new Subject()

  constructor() { }

  findCofres(): Observable<Cofre[]> {
    return of(
      [
        {
          id: '1',
          nome: 'Cofre 1',
          valor: 'R$ 5.000,00',
          objetivo: 'R$ 10.000,00',
          progresso: '50',
          status: Status.guardando
        },
        {
          id: '2',
          nome: 'Cofre 2',
          valor: '$ 5.000,00',
          objetivo: '$ 10.000,00',
          progresso: '50',
          status: Status.despriorizado
        },
        {
          id: '3',
          nome: 'Cofre 3',
          valor: 'R$ 10.000,00',
          objetivo: 'R$ 10.000,00',
          progresso: '100',
          status: Status.finalizado
        }
      ],
    )
  }

  findCofreById(id: string): Observable<CofreDetail> {
    return of({
      id: '1',
      nome: 'Cofre 1',
      moeda: 'BRL',
      objetivo: 10000,
      status: Status.getKeyByValue(Status.guardando),
      total: 5000,
      progresso: '50',
      transacoes: [
        {
          id: '1',
          valor: '5000',
          data: '28/10/2023',
          descricao: 'Alocação - Rendimentos'
        },
        {
          id: '2',
          valor: '5000',
          data: '28/10/2023',
          descricao: 'Alocação - Rendimentos'
        }
      ]
    })
  }

  findTransacaoById(id: string): Observable<TransacaoDetail> {
    return of({
      id: '1',
      valor: 10000,
      descricao: 'Alocacao',
      moeda: 'BRL',
      data: new Date('2023-10-29')
    })
  }

  get blockObservable() {
    return this._blockEmitter$
  }

  blockCard(block: boolean) {
    this._blockEmitter$.next(block);
  }
}
