import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postStudent(data : any) {
    return this.http.post<any>("http://localhost:3000/students/", data)  
  }
  getStudent() {
    return this.http.get<any>("http://localhost:3000/students/")
  }
  updateStudent(data : any, id : number) {
    return this.http.put<any>("http://localhost:3000/students/" + id, data)
  }
  deleteStudent(id : number) {
    return this.http.delete<any>("http://localhost:3000/students/" + id)
  }
}
