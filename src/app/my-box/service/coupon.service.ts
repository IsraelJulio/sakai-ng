import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/domain/coupon';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CouponService {
    constructor(protected http: HttpClient) {}
    post = (coupon: Coupon) =>
        this.http.post<Coupon[]>(`${environment.ApiUrl}/Coupon`, coupon);
    put = (coupon: Coupon) =>
        this.http.put<Coupon[]>(
            `${environment.ApiUrl}/Coupon/${coupon.id}`,
            coupon
        );
    get = () => this.http.get<Coupon[]>(`${environment.ApiUrl}/Coupon`);
    getActives = () =>
        this.http.get<Coupon[]>(`${environment.ApiUrl}/Coupon/active`);
    getAvailableCoupon = () =>
        this.http.get<Coupon[]>(`${environment.ApiUrl}/Quiz/Available`);
    getById = (id: string) =>
        this.http.get<Coupon>(`${environment.ApiUrl}/Coupon/${id}`);
    delete = (id: string) =>
        this.http.delete<Coupon[]>(`${environment.ApiUrl}/Coupon/${id}`);

    deleteList(ids: string[]): Observable<Coupon[]> {
        return this.http.delete<Coupon[]>(
            `${environment.ApiUrl}/Coupon/DeleteByIds`,
            { body: ids }
        );
    }
}
