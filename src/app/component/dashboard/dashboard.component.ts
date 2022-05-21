import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {NotificationService} from 'src/app/service/notification.service';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productDetails !: FormGroup;
  product: Product = {_id: '', titulo: '', preco: 0, descricao: ''};
  productList: Product[] = [];

  constructor(private formBuilder: FormBuilder, private service: ProductService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getProducts()

    this.productDetails = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      price: [''],
    })
  }

  addProduct() {
    this.product.titulo = this.productDetails.value.title
    this.product.descricao = this.productDetails.value.description
    this.product.preco = this.productDetails.value.price

    this.service.addProduct(this.product).subscribe(res => {
      this.getProducts();
    }, (err) => {
      this.notificationService.showError("Unable to add product.", "Error")
    }, () => {
      this.notificationService.showSuccess("Product added successfully", "Success")
    })
  }

  getProducts() {
    return this.service.getProducts().subscribe(res => {
      this.productList = res
    }, (err) => {
      this.notificationService.showError("Unable to get product.", "Error")
    }, () => {
    })
  }

  deleteProduct(product: Product) {
    this.service.deleteProduct(product).subscribe(res => {
      this.getProducts()
    }, (err) => {
      this.notificationService.showError("Unable to delete product.", "Error")
    }, () => {
      this.notificationService.showSuccess("Product deleted successfully", "Success")
    })
  }

  editProduct(product: Product) {
    this.productDetails.controls['id'].setValue(product._id)
    this.productDetails.controls['title'].setValue(product.titulo)
    this.productDetails.controls['description'].setValue(product.descricao)
    this.productDetails.controls['price'].setValue(product.preco)
  }

  updateProduct() {
    this.product._id = this.productDetails.value.id
    this.product.titulo = this.productDetails.value.title
    this.product.descricao = this.productDetails.value.description
    this.product.preco = this.productDetails.value.price

    this.service.updateProduct(this.product).subscribe(res => {
      this.getProducts()
    }, (err) => {
      this.notificationService.showError("Unable to update product. ", "Error")
    }, () => {
      this.notificationService.showSuccess("Product updated successfully", "Success")
    })
  }
}
