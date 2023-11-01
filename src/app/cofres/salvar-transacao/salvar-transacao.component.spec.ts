import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarTransacaoComponent } from './salvar-transacao.component';

describe('SalvarTransacaoComponent', () => {
  let component: SalvarTransacaoComponent;
  let fixture: ComponentFixture<SalvarTransacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalvarTransacaoComponent]
    });
    fixture = TestBed.createComponent(SalvarTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
