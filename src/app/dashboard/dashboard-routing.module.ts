import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailComponent } from './pages/students/components/student-detail/student-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/components/course-detail/course-detail.component';

const routes: Routes = [  
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }