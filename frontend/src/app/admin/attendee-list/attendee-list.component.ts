import { Component , OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import { UserService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendee-list1',
  standalone: true,
  imports: [RouterOutlet,Footer2Component, Sidebar3Component, Navbar3Component, RouterLink, CommonModule],
  templateUrl: './attendee-list.component.html',
  styleUrl: './attendee-list.component.css'
})
export class AttendeeList2Component implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe((data: any) => {
      console.log('API response:', data); // Log the API response
      if (Array.isArray(data)) {
        this.users = data.filter(user => user.role === 'user');
      } else if (data.users && Array.isArray(data.users)) {
        this.users = data.users.filter((user: { role: string; }) => user.role === 'user');
      } else {
        console.error('Unexpected API response format:', data);
      }
    });
  }


  confirmDeactivation(user: any): void {
    if (confirm(`Are you sure you want to deactivate ${user.username}?`)) {
      this.deactivateUser(user.user_id);
    }
  }

  deactivateUser(user_id: string): void {
    this.http.put(`http://localhost:5500/users/deactivate/${user_id}`, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      () => {
        const user = this.users.find(u => u.user_id === user_id);
        if (user) {
          user.status = 'inactive';
        }
      },
      error => {
        console.error('Error deactivating user:', error);
      }
    );
  }


  confirmReactivation(user: any): void {
    if (confirm(`Are you sure you want to reactivate ${user.username}?`)) {
      this.reactivateUser(user.user_id);
    }
  }

  reactivateUser(user_id: string): void {
    this.http.put(`http://localhost:5500/users/reactive/${user_id}`, {}, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      () => {
        const user = this.users.find(u => u.user_id === user_id);
        if (user) {
          user.status = 'active';
        }
      },
      error => {
        console.error('Error reactivating user:', error);
      }
    );
  }

}
