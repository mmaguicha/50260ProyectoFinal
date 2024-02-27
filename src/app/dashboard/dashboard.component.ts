import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showSidebar = false;
  style = 'bolder';
  showHome = true;

  constructor(private route: ActivatedRoute) {
    //console.log(this.route.snapshot.queryParams);     
  }
}