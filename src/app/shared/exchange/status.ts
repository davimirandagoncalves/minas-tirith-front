export enum Status {
  nao_iniciado = 'Não Iniciado',
  finalizado = 'Finalizado',
  guardando = 'Guardando',
  despriorizado = 'Despriorizado',
}

export namespace Status {
  export function getAsSelectionList(): any {
    return Object.entries(Status)
      .filter(([key, value]) => key !== 'getAsSelectionList' && key !== 'getKeyByValue' )
      .map(([key, value]) => {
        return {
          label: value,
          code: key,
        };
      });
  }

  export function getKeyByValue(value: string) {
    return Object.keys(Status)[Object.values(Status).indexOf(value as unknown as Status)]
  }
}
