import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {Person} from '../entities/person';


@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) {
    }

    getPersons() {
        return this.http.get(`${config.apiUrl}/person/`);
    }

    savePerson(data: Person, managerId: number) {
        this.http.post(`${config.apiUrl}/person/${managerId}`, data)
            .subscribe(
                res => {
                }
            );
    }

    updatePerson(data: Person, managerId: number) {
        this.http.put(`${config.apiUrl}/person/manager/${managerId}`, data)
            .subscribe(
                res => {
                }
            );
    }

    updateisActivePerson(id: number, data: Person) {
        this.http.put(`${config.apiUrl}/person/${id}`, data)
            .subscribe(
                res => {
                }
            );
    }


    deletePerson(id: number) {
        this.http.delete(`${config.apiUrl}/person/${id}`)
            .subscribe(
                res => {
                }
            );
    }

}
