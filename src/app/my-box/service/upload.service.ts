import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class UploadService {
    constructor(private http: HttpClient) {}
}
