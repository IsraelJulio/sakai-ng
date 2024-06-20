import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/domain/client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(protected http: HttpClient) {}
    post = (client: Client) =>
        this.http.post<Client[]>(`${environment.ApiUrl}/Client`, client);
    put = (client: Client) =>
        this.http.put<Client[]>(
            `${environment.ApiUrl}/Client/${client.id}`,
            client
        );
    get = () => this.http.get<Client[]>(`${environment.ApiUrl}/Client`);
    getActives = () =>
        this.http.get<Client[]>(`${environment.ApiUrl}/Client/actives`);
    getById = (id: string) =>
        this.http.get<Client>(`${environment.ApiUrl}/Client/${id}`);
    delete = (id: string) =>
        this.http.delete<Client[]>(`${environment.ApiUrl}/Client/${id}`);

    deleteList(ids: string[]): Observable<Client[]> {
        return this.http.delete<Client[]>(
            `${environment.ApiUrl}/Client/DeleteByIds`,
            { body: ids }
        );
    }
}
