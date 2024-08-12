import { SwitchService } from './../../services/switch.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import { ManagerService } from '../../services/manager.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-manager-list',
  standalone: true,
  imports: [RouterOutlet,Footer2Component, Sidebar3Component,Navbar3Component, RouterLink, CommonModule],
  templateUrl: './manager-list.component.html',
  styleUrl: './manager-list.component.css'
})
export class ManagerListComponent implements OnInit{

  managers: any[] = [];

  constructor(private managerService: ManagerService, private switchService: SwitchService) {}

  ngOnInit(): void {
    this.managerService.fetchManagers().subscribe((data: any) => {
      console.log('API response:', data); // Log the API response
      if (Array.isArray(data)) {
        this.managers = data.filter(user => user.role === 'manager');
      } else if (data.managers && Array.isArray(data.managers)) {
        this.managers = data.users.filter((user: { role: string; }) => user.role === 'manager');
      } else {
        console.error('Unexpected API response format:', data);
      }
    });
  }

  onDeleteClick(user_id: string): void {
    if (confirm('Would you like to switch the role of this manager to user?')) {
      this.switchService.switchRoleToUser(user_id).subscribe(
        response => {
          console.log('Role switched successfully:', response);
          // Remove the user from the managers list
          this.managers = this.managers.filter(manager => manager.user_id !== user_id);
        },
        error => {
          console.error('Error switching role:', error);
        }
      );
    }
  }
}
