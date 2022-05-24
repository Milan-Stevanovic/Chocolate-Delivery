import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
@Component({
  selector: 'app-productContainer',
  templateUrl: './productContainer.component.html',
  styleUrls: ['./productContainer.component.css']
})
export class ProductContainerComponent implements OnInit{

    @Input() product: Product = new Product();

    constructor()
    {
    }

    ngOnInit(): void {}
  
}