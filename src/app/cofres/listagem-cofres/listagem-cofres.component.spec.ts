import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCofresComponent } from './listagem-cofres.component';

describe('ListagemCofresComponent', () => {
  let component: ListagemCofresComponent;
  let fixture: ComponentFixture<ListagemCofresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListagemCofresComponent]
    });
    fixture = TestBed.createComponent(ListagemCofresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
