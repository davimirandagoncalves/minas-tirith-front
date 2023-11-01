import { CofreService } from './../cofre.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Cofre } from 'src/app/shared/exchange/cofre';

@Component({
  selector: 'app-listagem-cofres',
  templateUrl: './listagem-cofres.component.html',
  styleUrls: ['./listagem-cofres.component.css']
})
export class ListagemCofresComponent implements OnInit {

  colunas = ['nomeCofre', 'valor', 'objetivo', 'progresso', 'status'];
  cofres: Cofre[] = [];

  breadcrumbItems: MenuItem[] = [];
  homeItem: MenuItem = {};

  constructor(
    private cofreService: CofreService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cofreService.findCofres().subscribe(cofres => this.cofres = cofres);

    this.breadcrumbItems = [{ label: 'Cofres', routerLink: '/cofres', icon: 'fa-solid fa-piggy-bank pr-2' }];
    this.homeItem = { icon: 'fa-solid fa-house', routerLink: '/' };
  }

  adicionarCofre() {
    this.router.navigate(['/cofres/novo'])
  }
}
