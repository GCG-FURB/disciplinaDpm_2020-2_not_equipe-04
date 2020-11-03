import { Component } from '@angular/core';
import { ItensService } from '../services/itens.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  objeto = {};

  constructor(private itensService: ItensService) {}

  logForm() {
    this.itensService.criarItem(this.objeto).subscribe(data => {
      if (data)
      {
        alert("Item criado!");
      }
    },
    error => {
      console.log(error);
    });
  }

}
