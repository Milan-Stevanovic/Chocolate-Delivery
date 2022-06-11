import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productContainer',
  templateUrl: './productContainer.component.html',
  styleUrls: ['./productContainer.component.css']
})
export class ProductContainerComponent implements OnInit{

    @Input() product: Product = new Product();
    @Output() addProductEmitter = new EventEmitter<{ order_product: Product, order_amount: number }>();

    addProductForm = new FormGroup({
      productId : new FormControl(""),
      amount : new FormControl("", [Validators.required, Validators.max(100)])
    })

    constructor() {}

    ngOnInit(): void {}
    
    AddProduct()
    {
      if(this.addProductForm.valid)
      {
        let order_product = this.product;
        let order_amount = this.addProductForm.controls['amount'].value;
  
        this.addProductEmitter.emit({order_product, order_amount})
      }
    }

    public createImgPath = (serverPath: string) => { 
      return environment.serverURL + '/' + serverPath; 
    }
}