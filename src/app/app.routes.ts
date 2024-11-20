import { Routes } from '@angular/router';
import { StudentAttendanceComponent } from './Student/student-attendance/student-attendance.component';
import { StudentFeedbackComponent } from './Student/student-feedback/student-feedback.component';
import { StudentNotificationComponent } from './Student/student-notification/student-notification.component';
import { StudentProfileComponent } from './User-Management/student-profile/student-profile.component';
import { StudentTimetableComponent } from './Student/student-timetable/student-timetable.component';
import { StudentHomeComponent } from './Student/student-home/student-home.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterUserComponent } from './Administrator/register-user/register-user.component';

export const routes: Routes = [
    {path : 'home', component: StudentHomeComponent },
    {path : 'attendance', component: StudentAttendanceComponent },
    {path : 'feedback', component: StudentFeedbackComponent },
    {path : 'notification', component: StudentNotificationComponent },
    {path : 'profile', component: StudentProfileComponent },
    {path : 'timetable', component: StudentTimetableComponent },
    {path : 'register', component: RegisterUserComponent },

    

];
