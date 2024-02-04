import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StudentsModule } from './pages/students/students.module';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailComponent } from './pages/students/components/student-detail/student-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/components/course-detail/course-detail.component';
import { CoursesModule } from './pages/courses/courses.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
    FooterComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    StudentsModule,
    CoursesModule,

    // /dashboard
    RouterModule.forChild([
      {
        path: 'home', //   /dashboard/home
        component: HomeComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
        loadChildren: () =>
          import('./pages/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'students/:id',
        component: StudentDetailComponent,
      },
      {
        path: 'courses', 
        component: CoursesComponent,
        loadChildren: () =>
          import('./pages/courses/courses.module').then(
            (m) => m.CoursesModule
          ),
      },
      {
        path: 'courses/:id',
        component: CourseDetailComponent,
      },
      {
        path: '**', // para cualquier path desconocido, me lleva al Home
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }