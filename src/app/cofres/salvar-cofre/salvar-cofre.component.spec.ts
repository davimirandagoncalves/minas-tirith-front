import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarCofreComponent } from './salvar-cofre.component';

describe('SalvarCofreComponent', () => {
  let component: SalvarCofreComponent;
  let fixture: ComponentFixture<SalvarCofreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalvarCofreComponent]
    });
    fixture = TestBed.createComponent(SalvarCofreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
