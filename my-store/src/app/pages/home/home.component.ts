import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void { //para manejar cosas asincronas
    this.productsService.getProductsByPage(10, 0)
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      console.log(data);
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
