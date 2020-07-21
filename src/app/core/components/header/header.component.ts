import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from "../../../user/services/user.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  localstorage;
  userId;
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    // this.localstorage = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('localstorage',this.localstorage)
    this.userService.currentUser.subscribe(user => 
      this.localstorage = user);
      console.log('userdata',this.localstorage)
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
