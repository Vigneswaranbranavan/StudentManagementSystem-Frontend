import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Service/Login/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { CustomJwtPayload } from '../../Service/Models/model';
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,FormsModule,CommonModule,ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Clear error message on form changes
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill out the form correctly.');
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe(
      (response) => {
        this.isLoading = false;

        // Decode the JWT token
        const decoded = jwtDecode<CustomJwtPayload>(response.token);
        
        // Get the user ID from the decoded token
        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        console.log(userId);  // Log the user ID

        // Save token and user role
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('UserId',userId)

        // Navigate based on user role
        switch (response.role) {
          case 'student':
            this.router.navigate(['/student']);
            break;
          case 'teacher':
            this.router.navigate(['/teacher']);
            break;
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'staff':
            this.router.navigate(['/staff']);
            break;
          default:
            this.errorMessage = 'Invalid role.';
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.toastr.error('Invalid email or password!!');
      }
    );
  }
}
