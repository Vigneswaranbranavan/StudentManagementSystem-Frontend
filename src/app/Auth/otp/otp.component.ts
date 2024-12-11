import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class OtpComponent implements OnInit {
  EnterdEmail: string | null = null;
  localOTP: string | null = null;

  userEmail: string = '';
  UserOTP: string = '';
  UserPassword: string = '';

  constructor(
    private OTPService: ForgotPasswordService,
    private toster: ToastrService,
    private rout: Router
  ) { }
  ngOnInit(): void {
    this.EnterdEmail = localStorage.getItem('Email');
    this.localOTP = localStorage.getItem('OTP');
  }



  SentOTP() {
    this.OTPService.sendOtp(this.userEmail).subscribe({
      next: res => {
        this.toster.success("Please enter the OTP sent to your email.")
        localStorage.setItem('Email', this.userEmail)
        setTimeout(() => {
          window.location.reload()
        }, 300);
      }, error: err => {
        this.toster.error("Error sending OTP.")
      }
    });
  }

  EnterOTP() {
    this.OTPService.verifyOtp(this.UserOTP).subscribe({
      next: res => {
        this.toster.success("OTP verified successfully.")
        localStorage.setItem('OTP', this.UserOTP)
        setTimeout(() => {
          window.location.reload()
        }, 300);
      }, error: err =>{
        this.toster.error("Invalid OTP.")
      }
    })
  }

  changePassword() {
    const theemail = localStorage.getItem('Email');
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
        this.toster.error("Error changing password.")
      }
    });
  }
}
