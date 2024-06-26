import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/domain/category';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(protected http: HttpClient) {}

    post = (category: Category) =>
        this.http.post<Category[]>(`${environment.ApiUrl}/Category`, category);
    put = (category: Category) =>
        this.http.put<Category[]>(
            `${environment.ApiUrl}/Category/${category.id}`,
            category
        );
    get = () => this.http.get<Category[]>(`${environment.ApiUrl}/Category`);
    getActives = () =>
        this.http.get<Category[]>(`${environment.ApiUrl}/Category/active`);
    getAvailableCategory = () =>
        this.http.get<Category[]>(`${environment.ApiUrl}/Quiz/Available`);
    getById = (id: string) =>
        this.http.get<Category>(`${environment.ApiUrl}/Category/${id}`);
    delete = (id: string) =>
        this.http.delete<Category[]>(`${environment.ApiUrl}/Category/${id}`);
    orderCategory = (categories: Category[]) =>
        this.http.post(`${environment.ApiUrl}/Category/order`, categories);
    deleteList(ids: string[]): Observable<Category[]> {
        return this.http.delete<Category[]>(
            `${environment.ApiUrl}/Category/DeleteByIds`,
            { body: ids }
        );
    }
}
