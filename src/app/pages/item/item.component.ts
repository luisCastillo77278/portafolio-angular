import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  cargandoI = true;
  producto: Item;
  id: string;
  constructor(private router: ActivatedRoute,
              private productoService: ProductosService) { }

  ngOnInit() {
    this.router.params
    .subscribe( (parametros)=>{
      console.log(parametros['id']);
      this.productoService.cargarItem(parametros['id'])
      .subscribe((resp: Item)=>{
        this.id = parametros['id'];
        this.cargandoI= false;
        this.producto = resp;
              
      });
    });
  }



}
