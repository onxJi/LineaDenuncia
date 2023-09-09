import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { PersonalInfo } from "../Models/PersonalInfo.model";

@Injectable({
    providedIn: 'root'
})
export class EventServicePersonalInfo {
    private personalInfoSubject = new Subject<PersonalInfo>();

    personalInfo$: Observable<PersonalInfo> = this.personalInfoSubject.asObservable();

    publishPersonalInfo(personalInfo: PersonalInfo){
        this.personalInfoSubject.next(personalInfo);
    }
}