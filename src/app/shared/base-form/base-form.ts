import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class BaseForm {
  abstract getForm(): FormGroup;
  abstract getRouter(): Router;
  abstract getActivatedRoute(): ActivatedRoute;

  aplicaCssErro(campo: string): any {
    return {
      'ng-invalid ng-dirty': this.verificaValidTouched(campo),
    };
  }

  verificaValidTouched(campo: string) {
    return (
      !this.getForm().get(campo)?.valid &&
      (this.getForm().get(campo)?.touched || this.getForm().get(campo)?.dirty)
    );
  }

  voltar(steps: number = 1) {
    this.getRouter().navigate(
      [
        Array.from(Array(steps).keys()).reduce(
          (previousValue: string) => previousValue + '../',
          ''
        ),
      ],
      { relativeTo: this.getActivatedRoute() }
    );
  }
}
