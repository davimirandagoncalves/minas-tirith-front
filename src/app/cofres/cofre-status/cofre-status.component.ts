import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/exchange/status';


@Component({
  selector: 'app-cofre-status',
  templateUrl: './cofre-status.component.html',
  styleUrls: ['./cofre-status.component.css']
})
export class CofreStatusComponent implements OnInit {

  @Input() status!: Status;

  severity = new Map<Status, string>([
    [Status.nao_iniciado, "danger"],
    [Status.finalizado, "success"],
    [Status.guardando, "warning"],
    [Status.despriorizado, "info"],
]);

  constructor() { }

  ngOnInit() {
  }

}
