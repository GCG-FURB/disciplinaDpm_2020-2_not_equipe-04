import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Imagem } from '../models/imagem.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss'],
})
export class DetalheComponent implements OnInit {

  public id: any;
  public imagem: Imagem = new Imagem();

  constructor(public nav: NavController, public route: ActivatedRoute, public photo: PhotoService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.photo.getDetalhe(this.id).subscribe(data => {
      this.imagem = data;
    },
    error => {
      console.log(error);
    });
  }

  public voltarPagina() {
    this.nav.back();
  }
}
