import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';



@Injectable({ providedIn: 'root' })
export class ItensService {
    
    constructor(private http: HttpClient) {
    }

    criarItem(item) {
        return this.http.post<boolean>('http://192.168.0.10:3000/criar', item)
            .pipe(map(response => {
                return response;
            }));
    }
    
    listarItens() {
        return this.http.get<Item[]>('http://192.168.0.10:3000/listar')
            .pipe(map(response => {
                return response;
            }));
    }
}