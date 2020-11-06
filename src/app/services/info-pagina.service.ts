import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipos: any [] = [];

  constructor( private http: HttpClient ) {

    // console.log('Servicio de infoPagina listo');

    // Leer el archivo JSON
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
          
        });
  }

  private cargarEquipo(){
    this.http.get('https://ejemplo-1-8097d.firebaseio.com/equipo.json')
    .subscribe( (res: any[])=>{
      this.equipos = res;
      
    });
  }

}



