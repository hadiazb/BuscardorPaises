import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
  public termino: string = '';
  public placeholder: string = 'Buscar Capital...';
  public hayError: boolean = false;
  public capital: Country[] = [];

  constructor(
    private capitalService: PaisService
  ) {

  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    if (!this.termino) {
      return
    }

    this.capitalService.buscarCapital(this.termino)
      .subscribe(capital => {
        this.capital = capital
        if (!capital.length) {
          this.hayError = true
        }
      }, (err) => {
        console.log('Error', err)
        this.hayError = true
        this.capital = []
      })
  }

  sugerencias(termino: string) {
    this.hayError = false;
  }
}
