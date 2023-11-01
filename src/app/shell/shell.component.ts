import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Home', icon: 'fa-solid fa-house', routerLink: "/home" },
          { label: 'Dashboard', icon: `fa-solid fa-scale-balanced`, disabled: true },
          { label: 'Cofres', icon: 'fa-solid fa-piggy-bank', routerLink: "/cofres"  },
          { label: 'Minas Tirith', icon: 'fa-solid fa-at', styleClass: 'app-name'}
      ];

      this.activeItem = this.items[0];
  }
}
