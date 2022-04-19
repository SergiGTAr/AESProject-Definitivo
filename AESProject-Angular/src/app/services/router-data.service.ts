import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RouterDataService {
    data: any

    addData(data : any) {
        this.data = data;
    }

    getData() : any {
        return this.data;
    }
}