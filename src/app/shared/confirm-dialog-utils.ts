export abstract class ConfirmDialogUtils {

  static cancelDialog(message: string = '', header: string = '', icon: string = '', accept: () => void) {
    return {
      acceptLabel: 'Remover',
      acceptButtonStyleClass: 'bg-red-500 border-red-500 shadow-bg-red-500',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'bg-gray-500 border-gray-500 shadow-bg-gray-500',
      message: message,
      header: header,
      icon: icon,
      accept
    }
  }
}
