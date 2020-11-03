import { Component } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Motion } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  rotAlpha = 0;
  rotBeta = 0;
  rotGamma = 0;

  getAcelerometro() {
      Motion.addListener('accel', (event) => {
        this.rotAlpha = event.rotationRate.alpha;
        this.rotBeta = event.rotationRate.beta;
        this.rotGamma = event.rotationRate.gamma;
      });
  }

}
