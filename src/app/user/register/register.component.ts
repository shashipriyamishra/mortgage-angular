import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../core/services/register.service";
import { FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective, NgForm, } from '@angular/forms';
import { UserService } from "../../user/services/user.service";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  namePattern = "^[a-zA-Z ]*$";
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  confirmEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  propertyCost = new FormControl('', [
    Validators.required,
    Validators.min(100000),
  ]);
  deposit = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);
  firstName =new FormControl('', [
    Validators.required,
    Validators.pattern(this.namePattern),
  ]);
  middleName =new FormControl('', [
    Validators.pattern(this.namePattern),
  ]);
  surName =new FormControl('', [
    Validators.required,
    Validators.pattern(this.namePattern),
  ]);
  maxDate = new Date();
  peopleApplying = new FormControl('1', [Validators.required]);
  emailNotmatched:boolean = false;
  showSpinner:boolean = false;
  isSubmitted = false;
  operationType;
  granted = false;
  employmentStatus;
  occupation;
  contractTpye;
  jobStartDate;
  title;
  dateOfBirth;
  phoneNumber;
  employedError:boolean = false;
  userData:any = {
    loginUserId:'',
    password:'',
    transactionalAccountNumber: '',
    mortgageAccountNumber:''



  };
  daysValidity:boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  passwordNotmatched = false;
  
  constructor(private registerService:RegisterService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void { 
    this.firstFormGroup = this.formBuilder.group({
      operationType: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      employmentStatus: ['', Validators.required],
      occupation: ['', Validators.required],
      contractTpye: ['', Validators.required],
      jobStartDate: ['', Validators.required,],
    });
    this.thirdFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      
    });
  }


  myFilter = (d: Date | null) => {
    const date1 = new Date(); 
    const date2 = d; 
    const DifferenceTime = date1.getTime() - date2.getTime(); 
    const DifferenceDays = DifferenceTime / (1000 * 3600 * 24);
    const nearestTo = Math.floor(DifferenceDays);
    if(nearestTo >= 90){
      this.daysValidity = false;
    }else{
      this.daysValidity = true; 
    }

    return DifferenceDays 
    
  }
  firstStepSubmit(){
    this.operationType = this.firstFormGroup.value.operationType;
  }
  secondStepSubmit(){
    this.employmentStatus = this.secondFormGroup.value.employmentStatus;
    this.occupation = this.secondFormGroup.value.occupation;
    this.contractTpye = this.secondFormGroup.value.contractTpye;
    this.jobStartDate = this.secondFormGroup.value.jobStartDate;
    this.jobStartDate = this.formatDate(this.jobStartDate);
  }
  thirdStepSubmit(){
    this.title = this.thirdFormGroup.value.title;
    this.dateOfBirth = this.thirdFormGroup.value.dateOfBirth;
    this.dateOfBirth = this.formatDate(this.dateOfBirth);
  }
  fourthStepSubmit(){
    this.phoneNumber = this.fourthFormGroup.value.phoneNumber;
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day , month, year].join('-');
}

  onBlurConfirmEmail(){
    if(this.email.value !== this.confirmEmail.value){
      this.emailNotmatched = true;
    }else{
      this.emailNotmatched = false;
    }
  }
  employmentChange(data){
    if(data !== "Employed"){
      this.employedError = true;
    }else{
      this.employedError = false;
    }
  }
  submitForm(){
    const data = {
      "contractTpye": this.secondFormGroup.value.contractTpye,
      "dateOfBirth": this.dateOfBirth,
      "deposit": this.deposit.value,
      "email": this.email.value,
      "employmentStatus": this.secondFormGroup.value.employmentStatus,
      "firstName": this.firstName.value,
      "jobStartDate": this.jobStartDate,
      "middleName": this.middleName.value,
      "occupation": this.secondFormGroup.value.occupation,
      "operationType": this.firstFormGroup.value.operationType,
      "peopleApplying": this.peopleApplying.value,
      "phoneNumber": this.fourthFormGroup.value.phoneNumber,
      "propertyCost": this.propertyCost.value,
      "surName": this.surName.value,
      "title": this.thirdFormGroup.value.title
    }
    this.userService.register(data)
            .pipe(first())
            .subscribe(
                data => {
                  let snackBarRef = this.snackBar.open('User registration successful', 'close', {
                    duration: 3000
                  });
                    this.userData = data;
                    this.granted = true;
                },
                error => {

                  this.granted = false;
                  if(error.error){
                    let snackBarRef = this.snackBar.open(error.error.message, 'close', {
                      duration: 3000
                    });
                  }else{
                    let snackBarRef = this.snackBar.open(error.message, 'close', {
                      duration: 3000
                    });
                  }
                  
                  this.granted = false;
                    // this.alertService.error(error);
                    // this.loading = false;
                });
  }
  matcher = new ErrorStateMatcher();
}
