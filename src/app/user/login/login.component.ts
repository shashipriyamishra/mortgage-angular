import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UserService } from "../../user/services/user.service";
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner:boolean = false;
  username: string;
  password: string;

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      loginUserId: ['', Validators.required],
      password: ['', Validators.required],
  });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    let data = this.loginForm.value;
    this.userService.login(data)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/account-summary']);
            },
            error => {
                this.loading = false;
                if(!error.error.message ){
                  let snackBarRef = this.snackBar.open(error.error, 'close', {
                    duration: 3000
                  });
                }else{
                let snackBarRef = this.snackBar.open(error.error.message, 'close', {
                  duration: 3000
                });
              }
            });
}

  }
