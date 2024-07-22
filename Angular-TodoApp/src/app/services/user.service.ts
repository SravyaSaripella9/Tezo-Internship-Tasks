import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observable} from 'rxjs';
import { UserSignUpModel } from '../models/userSignupModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUserByUserName(): Observable<UserSignUpModel>{
    return this.apiService.get('GetUserByUserName');
  }
}
