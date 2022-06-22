import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/dialogs/messageDialog/messageDialog.component';
import { Message } from 'src/app/shared/models/message.model';
import { NewProduct } from 'src/app/shared/models/newProduct.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-addNewProduct',
  templateUrl: './addNewProduct.component.html',
  styleUrls: ['./addNewProduct.component.css']
})
export class AddNewProductComponent implements OnInit{
  
  constructor(private adminService: AdminService, private matDialog: MatDialog)
  {

  }

  ngOnInit(): void {}


  productForm = new FormGroup({
    name : new FormControl("", [Validators.required]),
    ingredients : new FormControl("", [Validators.required]),
    price : new FormControl("", [Validators.required, Validators.min(1)]),
    picture : new FormControl("", [])
  })

  get name() { return this.productForm.get('name') as FormControl; }
  get ingredients() { return this.productForm.get('ingredients') as FormControl; }
  get price() { return this.productForm.get('price') as FormControl; }
  get picture() { return this.productForm.get('picture') as FormControl; }
  response: {dbPath: ''} = {dbPath: ""};

  AddNewProduct()
  {
    if(this.productForm.valid)
    {
        let newProduct: NewProduct = new NewProduct();
        newProduct.name = this.name.value;
        newProduct.ingredients = this.ingredients.value;
        newProduct.price = this.price.value;
        newProduct.picture = this.response.dbPath;

        this.adminService.addNewProduct(newProduct).subscribe(
          data => 
          {
              if(data == true)
              {
                  let message: Message = new Message();
                  message.title = "Success";
                  message.messageText = "Product succesfully added!"
                  this.matDialog.open(MessageDialogComponent, { data: message })
              }
              else
              {
                  let message: Message = new Message();
                  message.title = "Error Occured";
                  message.messageText = "Something went wrong"
                  this.matDialog.open(MessageDialogComponent, { data: message })
              }
          }
        );
    }
    else
    {
      let message: Message = new Message();
      message.title = "Form Invalid";
      message.messageText = "Please check if fields are correctly filled"
      this.matDialog.open(MessageDialogComponent, { data: message })
    }
  }

  uploadFinished = (event : any) => 
  { 
    this.response = event; 
  }
}