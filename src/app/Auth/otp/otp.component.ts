import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showOTPModal: boolean = false;
  showPasswordSection: boolean = false;

  sendOTP() {
    if (!this.email) {
      alert('Please enter your email.');
      return;
    }
    console.log('OTP sent to:', this.email);
    this.showOTPModal = true;
  }

  verifyOTP() {
    if (!this.otp) {
      alert('Please enter the OTP.');
      return;
    }
    console.log('OTP verified:', this.otp);
    this.showPasswordSection = true;
  }

  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    console.log('Password changed to:', this.newPassword);
    alert('Password successfully changed!');
    this.showPasswordSection = false;
  }
}