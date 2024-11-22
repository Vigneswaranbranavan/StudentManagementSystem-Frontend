import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { staff } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class StaffProfileService {

  url ='http://localhost:5101/api/Staff/Staff';


  constructor(private http:HttpClient) { }

  
  // createStaff(staff:staff){
  //   return this.http.post(this.url,staff)
  // }
  // getStaffs(){
  //   return this.http.get<staff[]>(this.url)
  // }
  getStaff(staffId:number){
    return this.http.get<staff>(this.url+'/'+staffId)
  }
  updateStaff(staff:staff ,staffId:number){
    return this.http.put(this.url+'/'+staffId,staff)
  }
  // deleteStaff(staffid: number){
  //   return this.http.delete(this.url+'/'+staffid)
  // }


}
