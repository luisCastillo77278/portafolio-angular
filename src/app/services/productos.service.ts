import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prodcuto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Prodcuto[] = [];
  productosFiltrados: Prodcuto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( (resolve, reject)=>{
      this.http.get('https://ejemplo-1-8097d.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Prodcuto[])=>{
        this.productos = resp;
        this.cargando = false;
        resolve();
      });

    });

  }

  cargarItem( id: string ) {
    return this.http.get(`https://ejemplo-1-8097d.firebaseio.com/productos/${ id }.json`);
  }
  
  buscarProducto( termino: string){

    if (this.productos.length === 0){
      // cargar productos
      this.cargarProductos().then(()=>{ // despues de tener los productos
        // filtrar producto
        this.filtrarProductos( termino );
      });

    } else{
      // Aplicar filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ){
    
    this.productosFiltrados = []; // purgamos el arreglo

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( (producto)=>{

      const tituloLower = producto.titulo.toLocaleLowerCase();

      if( producto.categoria.indexOf( termino )>=0 || tituloLower.indexOf( termino )>=0 ){
        this.productosFiltrados.push( producto );
      }
    });
  }
}
