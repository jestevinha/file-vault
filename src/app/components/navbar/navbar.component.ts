import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userName: string = 'user';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let loggedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (loggedUser?.username) this.userName = loggedUser.username;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
