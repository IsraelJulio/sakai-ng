import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MyOrder } from 'src/app/domain/my-order';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(protected http: HttpClient) {}
    post = (myOrder: MyOrder) =>
        this.http.post<MyOrder[]>(`${environment.ApiUrl}/Order`, myOrder);
    put = (myOrder: MyOrder) =>
        this.http.put<MyOrder[]>(
            `${environment.ApiUrl}/Order/${myOrder}`,
            myOrder
        );
    get = () => this.http.get<MyOrder[]>(`${environment.ApiUrl}/Order`);
    getActives = () =>
        this.http.get<MyOrder[]>(`${environment.ApiUrl}/Order/active`);
    updateOrderStatus = (id: string) =>
        this.http.post<MyOrder[]>(
            `${environment.ApiUrl}/Order/updateStatus`,
            id
        );
    getById = (id: string) =>
        this.http.get<MyOrder>(`${environment.ApiUrl}/Order/${id}`);
    delete = (id: string) =>
        this.http.delete<MyOrder[]>(`${environment.ApiUrl}/Order/${id}`);

    deleteList(ids: string[]): Observable<MyOrder[]> {
        return this.http.delete<MyOrder[]>(
            `${environment.ApiUrl}/Order/DeleteByIds`,
            { body: ids }
        );
    }
}
