import { Injectable } from '@angular/core';
import { UserSignInModel } from '../models/userSigninModel';
import { UserSignUpModel } from '../models/userSignupModel';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private api: ApiService) { }

  fetchSignInToken(user: UserSignInModel): Observable<string> {
    return this.api.post('Signin', user);
  }

  requestSignUp(user: UserSignUpModel): Observable<string> {
    return this.api.post('Signup', user);
  }

}