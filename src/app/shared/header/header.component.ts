import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  user: UserModel;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  searchData(value: string) {
    console.log(value);
    this.router.navigate(['/search', value]);
  }

}
