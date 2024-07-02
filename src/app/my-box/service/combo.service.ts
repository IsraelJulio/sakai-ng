import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from 'src/app/domain/combo';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ComboService {
    constructor(protected http: HttpClient) {}

    post = (combo: Combo) =>
        this.http.post<Combo[]>(`${environment.ApiUrl}/combo`, combo);
    put = (combo: Combo) =>
        this.http.put<Combo[]>(
            `${environment.ApiUrl}/combo/${combo.id}`,
            combo
        );
    get = () => this.http.get<Combo[]>(`${environment.ApiUrl}/combo`);
    getActives = () =>
        this.http.get<Combo[]>(`${environment.ApiUrl}/combo/active`);
    getById = (id: string) =>
        this.http.get<Combo>(`${environment.ApiUrl}/combo/${id}`);
    delete = (id: string) =>
        this.http.delete<Combo[]>(`${environment.ApiUrl}/combo/${id}`);
    orderCombo = (categories: Combo[]) =>
        this.http.post(`${environment.ApiUrl}/combo/order`, categories);
    deleteList(ids: string[]): Observable<Combo[]> {
        return this.http.delete<Combo[]>(
            `${environment.ApiUrl}/combo/DeleteByIds`,
            { body: ids }
        );
    }
}
