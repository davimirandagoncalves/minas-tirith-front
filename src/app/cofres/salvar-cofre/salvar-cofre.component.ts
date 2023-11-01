import { CofreService } from 'src/app/cofres/cofre.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { CofreDetail } from 'src/app/shared/exchange/cofre-detail';
import { Status } from 'src/app/shared/exchange/status';
import { CurrencyPipe } from '@angular/common';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BaseForm } from 'src/app/shared/base-form/base-form';
import { ConfirmDialogUtils } from 'src/app/shared/confirm-dialog-utils';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-salvar-cofre',
  templateUrl: './salvar-cofre.component.html',
  styleUrls: ['./salvar-cofre.component.css']
})
export class SalvarCofreComponent extends BaseForm implements OnInit, OnDestroy {

  cofre!: CofreDetail
  cofreForm!: FormGroup
  moedasList = ['EUR', 'BRL']
  statusList = Status.getAsSelectionList()

  // UX
  blockCard = false
  breadcrumbItems: MenuItem[] = []
  homeItem: MenuItem = {}
  showTransacoes = false;
  card!: ElementRef
  @ViewChild('cardCofre', { static: true }) cardCofre!: ElementRef;
  @ViewChild('cardTransacao', { static: true }) cardTransacao!: ElementRef;
  shouldRefresh: boolean = false;
  block$!: Subscription;
  router$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private messageService: MessageService,
    private router: Router,
    private cofreService: CofreService,
    private confirmationService: ConfirmationService,
    ) {
      super();
    }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          if (!!params['id']) {
            return params['id']
          }

          this.criarForm()
          return null
        }),
        filter(id => !!id),
        switchMap((id) => {
          this.shouldRefresh = false;
          return this.cofreService.findCofreById(id)
        })
      )
      .subscribe((cofreDetail) => {
        this.criarForm(cofreDetail)
      });

    this.breadcrumbItems = [{ label: 'Cofres', routerLink: '/cofres', icon: 'fa-solid fa-piggy-bank pr-2' }, { label: `${this.cofre.nome || 'Novo Cofre' }`}];
    this.homeItem = { icon: 'fa-solid fa-house', routerLink: '/' };

    this.router$ = this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.mostraOuNaoListaDeTransacoes(() => event.routerEvent.url.indexOf('transacao') > 0)
      } else if (event instanceof NavigationEnd) {
        this.mostraOuNaoListaDeTransacoes(() => event.url.indexOf('transacao') > 0)
      }
    })

    this.block$ = this.cofreService.blockObservable.subscribe((isToBlock) => {
      if (!!isToBlock) {
        this.doBlockCard(this.cardTransacao)
      } else {
        this.unblockCard(this.cardTransacao)
      }
    });
  }

  ngOnDestroy(): void {
    this.block$.unsubscribe()
    this.router$.unsubscribe()
  }

  criarForm(cofre: CofreDetail | null = null) {
    if (!!cofre) {
      this.cofre = cofre
    } else {
      this.cofre = {
        id: '',
        nome: '',
        moeda: 'BRL',
        objetivo: 0,
        status: Status.getKeyByValue(Status.nao_iniciado),
        total: 0,
        progresso: '0',
        transacoes: [],
      }
    }

    this.cofreForm = this.formBuilder.group({
      _id: [this.cofre.id],
      nomeCofre: [this.cofre.nome, [Validators.required]],
      moeda: [{value: this.cofre.moeda, disabled: !!this.cofre.id}, [Validators.required]],
      status: [this.cofre.status, [Validators.required]],
      objetivo: [this.cofre.objetivo, [Validators.required]],
    })
  }

  mostraOuNaoListaDeTransacoes(shouldHideTransacoesList: () => boolean) {
    if (!!this.cofre.id) {
      if (shouldHideTransacoesList()) {
        this.showTransacoes = false
        this.shouldRefresh = true;
      } else {
        this.showTransacoes = true
        this.refreshCofre()
      }
    }
  }

  aplicaCss(campo: string) {
    let cssErro = super.aplicaCssErro(campo);
    cssErro['w-full'] = true
    return cssErro
  }

  salvar() {
    this.cofreForm.markAllAsTouched()
    if (this.cofreForm.valid) {
      this.doBlockCard(this.cardCofre)
      setTimeout(() => {
        this.messageService.add({ summary: 'Sucesso!', severity: 'success', detail: 'Cofre salvo com sucesso!' });
        this.unblockCard(this.cardCofre)
      }, 1000);
    } else {
      this.messageService.add({ summary: 'Erro!', severity: 'error', detail: 'Dados não preenchidos corretamente!' });
    }
  }

  doBlockCard(card: ElementRef) {
    this.card = card
    this.blockCard = true
  }

  unblockCard(card: ElementRef) {
    this.card = card
    this.blockCard = false
  }

  getObjetivo() {
    return `Total: ${this.currencyPipe.transform(this.cofre.total, this.cofreForm.get('moeda')?.value)}`
  }

  getProgresso() {
    let objetivo = this.cofreForm.get('objetivo')?.value
    let total = this.cofre.total
    if (total > objetivo) {
      return 100
    }

    return (total as unknown as number * 100) / objetivo
  }

  override getForm(): FormGroup {
    return this.cofreForm
  }

  override getRouter(): Router {
    return this.router
  }
  override getActivatedRoute(): ActivatedRoute {
    return this.route;
  }

  remover() {
    this.confirmationService.confirm(
      ConfirmDialogUtils.cancelDialog(
        'Certeza que deseja remover este cofre?',
        'Confirmação',
        'pi pi-exclamation-triangle',
        () => {
          this.messageService.add({ severity: 'info', summary: 'Removido!', detail: 'Registro removido com sucesso!' });
          this.voltar();
      })
     );
  }

  refreshCofre() {
    if (!!this.shouldRefresh) {
      this.shouldRefresh = false;
      this.cofreService.findCofreById(this.cofre.id).subscribe(cofreDetail => this.criarForm(cofreDetail))
    }
  }
}
