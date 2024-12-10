import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPasswordService } from '../../Service/Login/OTP/forgot-password.service';
import { ToastrService } from 'ngx-toastr';
import { OTPChangePassword } from './OTPInterface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  OTPService = inject(ForgotPasswordService)
  toster = inject(ToastrService)
  EnterdEmail = localStorage.getItem('Email')
  localOTP = localStorage.getItem('OTP')
  userEmail: string = '';
  UserOTP: string = '';
  UserPassword: string = '';
  rout = inject (Router)


  SentOTP() {
    this.OTPService.sendOtp(this.userEmail).subscribe({
      next: res => {
        this.toster.success("Please enter the otp")
        localStorage.setItem('Email', this.userEmail)
        setTimeout(() => {
          window.location.reload()
        }, 300);
      }, error: err => {
        this.toster.error(err.error)
      }
    })
  }

  EnterOTP() {
    this.OTPService.verifyOtp(this.UserOTP).subscribe({
      next: res => {
        this.toster.success("OTP is valid")
        localStorage.setItem('OTP', this.UserOTP)
        setTimeout(() => {
          window.location.reload()
        }, 300);
      }
    })
  }

  changePassword() {
    let theemail = localStorage.getItem('Email');
    if (!theemail) {
      this.toster.error('Email not found. Please log in again.');
      return;
    }

    const data: OTPChangePassword = {
      email: theemail,
      password: this.UserPassword
    };
    this.OTPService.changepassword(data).subscribe({
      next: res => {
        this.toster.success("Password changed Succesfuly")
        localStorage.removeItem('Email')
        localStorage.removeItem('OTP')
        this.rout.navigateByUrl('/login')
      },
      error: err => {
        this.toster.error(err.error)
      }
    })
  }
}
