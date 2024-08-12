import {  AfterViewInit, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Footer2Component } from '../../event-manager-component/footer2/footer2.component';
import { Sidebar3Component } from '../sidebar3/sidebar3.component';
import { Navbar3Component } from '../navbar3/navbar3.component';
import {Chart,registerables} from 'chart.js';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/users.service';
import { RevenueService } from '../../services/revenue.service';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Footer2Component,Sidebar3Component,Navbar3Component],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboard1Component  implements AfterViewInit{
  userCount: number = 0;
  totalRevenue: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private userService: UserService,  private revenueService: RevenueService) {
    Chart.register(...registerables);
    this.getallusers();
    this.getTotalRevenue();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId))
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('chart') as HTMLCanvasElement; // Corrected the ID
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Sales',
            data: [3, 5, 6, 9, 7, 12, 19],
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Added color
            borderColor: 'rgba(75, 192, 192, 1)', // Added border color
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.log("canvas error");
    }
  }


  getallusers(): void {
    this.userService.fetchUsers().subscribe(users => {
      this.userCount = users.length;
    });

}

getTotalRevenue(): void {
  this.revenueService.getTotalRevenue().subscribe(revenue => {
    this.totalRevenue = revenue;
  });
}
}