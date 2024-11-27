import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Service/Login/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService,  private router: Router
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
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe(
      (response) => {
        this.isLoading = false;
        localStorage.setItem('token', response.token); // Save token if needed
        this.router.navigate(['/student']); 
      },
      (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
      


      
    );
  }

}
