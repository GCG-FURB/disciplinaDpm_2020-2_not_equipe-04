import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Plugins, CameraResultType, CameraPhoto, CameraSource } from '@capacitor/core';
import { Platform, AlertController } from '@ionic/angular';

import { Cliente } from "../models/cliente.model";
import { Imagem } from "../models/imagem.model";
import { Ponto } from '../models/ponto.model';
import { Router } from '@angular/router';

const { Camera, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private platform: Platform;

  constructor(platform: Platform, private http: HttpClient, public alertController: AlertController, public router: Router) {
    this.platform = platform;
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sucesso!',
      message: 'Imagem adicionada com sucesso.',
      buttons: [{
        text: 'Massa!', 
        handler: () => {
          this.router.navigate(["/tabs/tab1"]);
        }
      }
    ]
    });

    await alert.present();
  }

  public async addNewToGallery(coordinates: Ponto) {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    
    const imagemBase64 = await this.readAsBase64(capturedPhoto);

    let fotografo: Cliente = {
      id: 1
    };

    let imagem: Imagem = {
      descricao: "Imagem teste",
      imagem: imagemBase64,
      fotografo: fotografo,
      coordenadas: coordinates
    };

    await this.http.post<Imagem>(`http://192.168.0.10:8181/geo-shot/imagem/salvar`, imagem)
      .pipe(map(response => {
        this.presentAlert();
      })).toPromise();
  }

  public getAllMine() {
    return this.http.get<Imagem[]>(`http://192.168.0.10:8181/geo-shot/imagem/listar/1`)
      .pipe(map(response => {
        return response;
      }));
  }

  public getDetalhe(id: number) {
    return this.http.get<Imagem>(`http://192.168.0.10:8181/geo-shot/imagem/detalhar/`+id)
      .pipe(map(response => {
        return response;
      }));
  }

  public getAll(ponto: Ponto) {
    return this.http.get<Imagem[]>(`http://192.168.0.10:8181/geo-shot/imagem/listar/`+ponto.x+`/`+ponto.y)
      .pipe(map(response => {
        return response;
      }));
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob) as string).split("base64,")[1];
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
