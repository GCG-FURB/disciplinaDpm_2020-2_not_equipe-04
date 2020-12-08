import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Imagem } from '../models/imagem.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fotos: Imagem[];

  private loading: any;

  constructor(public photoService: PhotoService, public loadingController: LoadingController) {
  }

  private async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando imagens!',
    });
    await this.loading.present();
  }

  ionViewWillEnter(){
    this.fetchData();
  }

  public async fetchData() {
    await this.presentLoading();
    this.photoService.getAllMine().subscribe(
      data => {
        this.loading.dismiss();
        this.fotos = data;
      },
      error => {
        console.log(error);
      });
  }

}

