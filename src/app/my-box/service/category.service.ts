import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/domain/category';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(protected http: HttpClient) {}

    post = (category: Category) =>
        this.http.post(`${environment.ApiUrl}/Category`, category);
    put = (category: Category) =>
        this.http.put(
            `${environment.ApiUrl}/Category/${category.id}`,
            category
        );
    get = () => this.http.get<Category[]>(`${environment.ApiUrl}/Category`);
    getAvailableCategory = () =>
        this.http.get<Category[]>(`${environment.ApiUrl}/Quiz/Available`);
    getById = (id: string) =>
        this.http.get<Category>(`${environment.ApiUrl}/Category/${id}`);
    delete = (id: number) =>
        this.http.delete(`${environment.ApiUrl}/Category/${id}`);
}
