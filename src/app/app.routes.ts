import { Routes } from '@angular/router';
import { StudentAttendanceComponent } from './Student/student-attendance/student-attendance.component';
import { StudentFeedbackComponent } from './Student/student-feedback/student-feedback.component';
import { StudentNotificationComponent } from './Student/student-notification/student-notification.component';
import { StudentProfileComponent } from './User-Management/student-profile/student-profile.component';
import { StudentTimetableComponent } from './Student/student-timetable/student-timetable.component';
import { StudentHomeComponent } from './Student/student-home/student-home.component';
import { RegisterStudentComponent } from './Staff/register-student/register-student.component';
import { MarkAttendanceComponent } from './Staff/mark-attendance/mark-attendance.component';
import { ManageTimetableComponent } from './Staff/manage-timetable/manage-timetable.component';

export const routes: Routes = [
    // for student
    {path : '', component: StudentHomeComponent },
    {path : 'attendance', component: StudentAttendanceComponent },
    {path : 'feedback', component: StudentFeedbackComponent },
    {path : 'notification', component: StudentNotificationComponent },
    {path : 'profile', component: StudentProfileComponent },
    {path : 'timetable', component: StudentTimetableComponent },

    //for staff
    {path : 'student-register', component: RegisterStudentComponent},
    {path : 'mark-attendance' , component: MarkAttendanceComponent},
    {path : 'manage-timetable' , component: ManageTimetableComponent}
    

];
