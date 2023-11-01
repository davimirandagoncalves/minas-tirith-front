import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/shared/base-form/base-form';
import { CofreService } from '../cofre.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { TransacaoDetail } from 'src/app/shared/exchange/transacao-detail';
import { ConfirmDialogUtils } from 'src/app/shared/confirm-dialog-utils';

@Component({
  selector: 'app-salvar-transacao',
  templateUrl: './salvar-transacao.component.html',
  styleUrls: ['./salvar-transacao.component.css'],
})
export class SalvarTransacaoComponent extends BaseForm implements OnInit {

  transacaoForm!: FormGroup;
  isEdit = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cofreService: CofreService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => {
          if (!!params['id']) {
            this.isEdit = true;
            return params['id']
          }

          this.createForm()
          this.transacaoForm.patchValue({
            '_moeda': params['moeda']
          })
          return null
        }),
        filter(id => !!id),
        switchMap((id) => this.cofreService.findTransacaoById(id))
      )
      .subscribe((transacaoDetail) => {
        this.createForm(transacaoDetail);
      });
  }

  createForm(transacaoDetail: TransacaoDetail | null = null) {
    this.transacaoForm = this.formBuilder.group({
      _id: [transacaoDetail?.id],
      valor: [transacaoDetail?.valor, Validators.required],
      data: [transacaoDetail?.data, Validators.required],
      descricao: [transacaoDetail?.descricao, Validators.required],
      _moeda: [transacaoDetail?.moeda, Validators.required],
    });
  }

  override getForm(): FormGroup {
    return this.transacaoForm;
  }

  remover() {
    this.confirmationService.confirm(
      ConfirmDialogUtils.cancelDialog(
        'Certeza que deseja remover esta transação?',
        'Confirmação',
        'pi pi-exclamation-triangle',
        () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Removido!',
            detail: 'Registro removido com sucesso!',
          });
          this.voltar(2);
        }
      )
    );
  }

  salvar() {
    this.transacaoForm.markAllAsTouched();
    if (this.transacaoForm.valid) {
      this.cofreService.blockCard(true);
      setTimeout(() => {
        this.messageService.add({
          summary: 'Sucesso!',
          severity: 'success',
          detail: 'Transação salva com sucesso!',
        });
        this.cofreService.blockCard(false);
      }, 1000);
    } else {
      this.messageService.add({
        summary: 'Erro!',
        severity: 'error',
        detail: 'Dados não preenchidos corretamente!',
      });
    }
  }

  override getRouter(): Router {
    return this.router;
  }
  override getActivatedRoute(): ActivatedRoute {
    return this.activatedRoute;
  }
}
