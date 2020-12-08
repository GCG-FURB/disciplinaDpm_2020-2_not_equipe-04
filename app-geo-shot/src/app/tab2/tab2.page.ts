import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Plugins } from '@capacitor/core';
import { Ponto } from '../models/ponto.model';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  coordinates: any;
  latitude: any;
  longitude: any;

  constructor(public photoService: PhotoService) {
  }
  
  ionViewWillEnter() {
    this.addImagem();
  }
  
  public async addImagem() {
    await this.getPosicaoAtual();
    let ponto: Ponto = {
      x: this.latitude,
      y: this.longitude
    }
    await this.photoService.addNewToGallery(ponto);
  }

  private async getPosicaoAtual() {
    this.coordinates = await Geolocation.getCurrentPosition();
    this.latitude = this.coordinates.coords.latitude;
    this.longitude = this.coordinates.coords.longitude;
  }

}
