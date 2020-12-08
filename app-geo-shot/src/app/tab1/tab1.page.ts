import { Component } from '@angular/core';
import { Imagem } from '../models/imagem.model';
import { PhotoService } from '../services/photo.service';
import { Plugins } from '@capacitor/core';
import { Ponto } from '../models/ponto.model';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  fotos: Imagem[];
  coordinates: any;
  latitude: any;
  longitude: any;

  private loading: any;

  constructor(public photoService: PhotoService, public router: Router, public loadingController: LoadingController) {
  }

  ionViewWillEnter(){
    this.fetchData();
  }

  private async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando imagens!',
    });
    await this.loading.present();
  }

  public async fetchData() {
    await this.presentLoading();
    await this.getPosicaoAtual();
    let ponto: Ponto = {
      x: this.latitude,
      y: this.longitude
    }
    this.photoService.getAll(ponto).subscribe(
      data => {
        this.loading.dismiss();
        this.fotos = data;
        this.fotos.forEach(foto => {
          foto.distancia = Math.round((foto.distancia + Number.EPSILON) * 100) / 100;
        });
      },
      error => {
        console.log(error);
      });
  }

  public abrirDetalhe(id: number) {
    this.router.navigate(["/detalhe/"+id]);
  }

  private async getPosicaoAtual() {
    this.coordinates = await Geolocation.getCurrentPosition();
    this.latitude = this.coordinates.coords.latitude;
    this.longitude = this.coordinates.coords.longitude;
  }

}
