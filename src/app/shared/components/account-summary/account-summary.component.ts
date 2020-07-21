import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { UserService } from "../../../user/services/user.service";
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {
accountSummary;
  constructor(private userService: UserService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getAccountSummary()
        .pipe(first())
        .subscribe(
            data => {
                this.accountSummary = data;
            },
            error => {
                
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
  refresh(){
    this.userService.getAccountSummary()
        .pipe(first())
        .subscribe(
            data => {
                this.accountSummary = data;
            },
            error => {
                
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
