import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RegisterUserComponent } from './app/Administrator/register-user/register-user.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EditProfileComponent } from './app/Student/edit-profile/edit-profile.component';
import { StudentAttendanceComponent } from './app/Student/student-attendance/student-attendance.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // bootstrapApplication(EditProfileComponent).catch(err => console.error(err));

  // bootstrapApplication(RegisterUserComponent)
  // .catch(err => console.error(err));


  // platformBrowserDynamic().bootstrapModule(EditProfileComponent)
  // .catch(err => console.error(err));
  

  // platformBrowserDynamic().bootstrapModule(StudentAttendanceComponent)
  // .catch(err => console.error(err));



  // platformBrowserDynamic()
  // .bootstrapModule(RegisterUserComponent)
  // .catch((err) => console.error(err));