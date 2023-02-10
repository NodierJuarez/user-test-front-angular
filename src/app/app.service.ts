import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './interface/user.interface';

@Injectable({providedIn: 'root'})
export class AppUserService {
    constructor(private httpClient: HttpClient) { }
    
    createUser(userObject: User) {
        return this.httpClient.post('http://localhost:3000/users', userObject);
    }
}