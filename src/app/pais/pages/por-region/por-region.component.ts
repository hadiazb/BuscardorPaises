import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px
      }
    `
  ]
})
export class PorRegionComponent {

  public regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC']
  public regionActiva: string = '';
  public paises: Country[] = [];
  public hayError: boolean = false;


  constructor(
    private paisService: PaisService
  ) { }

  getClaseCss(region: string): string {
    return region === this.regionActiva ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion(region: string) {

    if (region === this.regionActiva) {
      return;
    }

    this.hayError = false;
    this.regionActiva = region;
    this.paises = []
    this.paisService.buscarRegion(region)
      .subscribe(region => {
        this.paises = region
        console.log(region)
      }, (err) => {
        console.log('Error', err)
        this.hayError = true
        this.paises = []
      })
  }

}
