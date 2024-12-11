import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OTPChangePassword } from '../../../Auth/otp/OTPInterface';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = "https://localhost:7058/api/User/"

  constructor(private http: HttpClient) { }

  sendOtp(email: string){
    return this.http.post(this.apiUrl + `SentOTP?email=${email}`,{})
  }


  verifyOtp(OTP:string){
    return this.http.post(this.apiUrl + `CheckOTP?otp=${OTP}`,{})
  }

  changepassword(data:OTPChangePassword){
    return this.http.post(this.apiUrl + `ChangePassword`,data)
  }
}
