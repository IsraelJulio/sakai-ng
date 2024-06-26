import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/domain/product';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(protected http: HttpClient) {}

    post = (product: Product) =>
        this.http.post<Product[]>(`${environment.ApiUrl}/Product`, product);
    put = (product: Product) =>
        this.http.put<Product[]>(
            `${environment.ApiUrl}/Product/${product.id}`,
            product
        );
    get = () => this.http.get<Product[]>(`${environment.ApiUrl}/Product`);
    getActives = () =>
        this.http.get<Product[]>(`${environment.ApiUrl}/Product/actives`);

    getById = (id: string) =>
        this.http.get<Product>(`${environment.ApiUrl}/Product/${id}`);
    delete = (id: string) =>
        this.http.delete<Product[]>(`${environment.ApiUrl}/Product/${id}`);
    deleteList(ids: string[]): Observable<Product[]> {
        return this.http.delete<Product[]>(
            `${environment.ApiUrl}/Product/DeleteByIds`,
            { body: ids }
        );
    }
    orderProduct = (products: Product[][]) =>
        this.http.post(`${environment.ApiUrl}/Product/order`, products);
}
