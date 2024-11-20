import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Auth/login/login.component";
import { StudentSidebarComponent } from './Student/student-sidebar/student-sidebar.component';
import { HomeComponent } from './Home/home/home.component';
import { StudentNotificationComponent } from './Student/student-notification/student-notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, StudentSidebarComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student-Management-System';
}
