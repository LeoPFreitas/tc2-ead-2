import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from '../model/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://leonardo-pereira-freitas-sc3007405.glitch.me/api/produtos'
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product)
  }

  updateProduct(product: Product): Observable<Product> {
    const id = product._id
    return this.httpClient.put<Product>(`${this.baseUrl}/${id}`, product)
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl)
  }

  deleteProduct(product: Product) {
    const id = product._id
    return this.httpClient.delete<Product[]>(`${this.baseUrl}/${id}`)

  }
}
