import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() control: AbstractControl | null | undefined;

  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control?.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return this.getErrorMsg(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }

  getErrorMsg(validatorName: string, validatorValue?: any) {
    return {
      required: `Campo obrigatório!`,
      minlength: `Mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `Máximo ${validatorValue.requiredLength} caracteres.`,
    }[validatorName];
  }
}
