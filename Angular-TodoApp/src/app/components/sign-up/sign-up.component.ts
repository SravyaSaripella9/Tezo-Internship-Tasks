import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { UserSignUpModel } from '../../models/userSignupModel';
import { ResponseDetails } from '../../models/responseDetails';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user!: UserSignUpModel;
  invalidMessage: string = "";
  responseDetails: ResponseDetails = { isSuccess: false, message: "" };
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  );

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  onSignup(): void {
    var userDetails = this.signupForm.value;
    if (userDetails.firstName == "" || userDetails.lastName == "" || userDetails.userName == "" || userDetails.email == "" || userDetails.password == "")
      this.invalidMessage = "Please enter required fields";
    else {
      if (!this.signupForm.invalid) {
        this.invalidMessage = "";
        this.user = new UserSignUpModel(userDetails.firstName!, userDetails.lastName!, userDetails.userName!, userDetails.email!, userDetails.password!);
        this.authenticationService.requestSignUp(this.user).subscribe({
          next: t => {
            this.responseDetails.isSuccess = true;
            this.responseDetails.message = "Signup Success";
            this.router.navigate(['/signin']);
          },
          error: (errorResponse: any) => {
            this.responseDetails.isSuccess = false;
            this.responseDetails.message = errorResponse.error;
            this.signupForm.reset();
          },
        });
      }
    }
  }

}
