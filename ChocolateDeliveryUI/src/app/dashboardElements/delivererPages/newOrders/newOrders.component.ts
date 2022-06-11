import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DelivererService } from 'src/app/shared/services/deliverer.service';

@Component({
  selector: 'app-newOrders',
  templateUrl: './newOrders.component.html',
  styleUrls: ['./newOrders.component.css']
})
export class NewOrdersComponent implements OnInit{
  
  orders = [];

  constructor(private delivererService: DelivererService, private matDialog: MatDialog)
  {
  }


  ngOnInit(): void {}
}