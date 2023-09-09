import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Catalog } from "../Models/Catalog.model";

@Injectable({
    providedIn: 'root'
})
export class EventServiceCatalog {
    private catalogSubject = new Subject<Catalog>();

    catalog$: Observable<Catalog> = this.catalogSubject.asObservable();

    publishCatalog(catalog: Catalog){
        this.catalogSubject.next(catalog);
    }
}