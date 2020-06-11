import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  user: UserModel;

  constructor(public sidebarService: SidebarService, public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.sidebarService.loadMenu();
  }

}
