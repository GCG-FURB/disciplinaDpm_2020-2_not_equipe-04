import { Component } from '@angular/core';
import { ItensService } from '../services/itens.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaItens: Item[];

  constructor(private itensService: ItensService) {
    this._fetchData();
  }

  private _fetchData() {
    this.itensService.listarItens()
      .subscribe(
        data => {
          this.listaItens = data;
        },
        error => {
          console.log(error);
        });
  }

}
