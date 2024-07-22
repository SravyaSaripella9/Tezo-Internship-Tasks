import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserSignInModel } from '../../models/userSigninModel';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ResponseDetails } from '../../models/responseDetails';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  user!: UserSignInModel;
  invalidMessage: string = "";
  responseDetails: ResponseDetails = { isSuccess: false, message: "" };
  signinForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  );

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  onSignin(): void {
    var userDetails = this.signinForm.value;
    if (userDetails.userName == "" || userDetails.password == "")
      this.invalidMessage = "Please enter required fields";
    else {
      if (!this.signinForm.invalid) {
        this.invalidMessage = "";
        this.user = new UserSignInModel(userDetails.userName!, userDetails.password!);
        this.authenticationService.fetchSignInToken(this.user).subscribe({
          next: t => {
            localStorage.setItem("Authentication Token", t);
            this.responseDetails.isSuccess = true;
            this.responseDetails.message = "Signin Success";
            this.router.navigate(['/dashboard']);
          },
          error: (errorResponse: any) => {
            this.responseDetails.isSuccess = false;
            this.responseDetails.message = errorResponse.error;
            this.signinForm.reset();
          },
        });
      }
    }
  }

}
