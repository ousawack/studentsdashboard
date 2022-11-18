import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './students-dashboard';

@Component({
  selector: 'app-students-dashboard',
  templateUrl: './students-dashboard.component.html',
  styleUrls: ['./students-dashboard.component.css']
})
export class StudentsDashboardComponent implements OnInit {

  formValue !: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  searchText !: any;

  constructor(private formbuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [""],
      lastName : [""],
      email : [""],
      phoneNumber : [""],
      grade : [""]
    })
    this.getAllStudents();
  }

  clickAddStudent() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postStudentDetails() {
    this.studentModelObj.firstName = this.formValue.value.firstName;
    this.studentModelObj.lastName = this.formValue.value.lastName;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.studentModelObj.grade = this.formValue.value.grade;

    this.api.postStudent(this.studentModelObj)
    .subscribe(res => {
      console.log(res);
      // alert("Student successfully added.")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    },
    err => {
      alert("Something went wrong.")
    }
    )
  }

  getAllStudents() {
    this.api.getStudent()
    .subscribe(res => {
      this.studentData = res;
    })
  }

  deleteStudent(row : any) {
    this.api.deleteStudent(row.id)
    .subscribe(res => {
      console.log(res);
      // alert("Student deleted.")
      this.getAllStudents();
    })
  }

  onEdit(row : any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id;
    this.formValue.controls["firstName"].setValue(row.firstName);
    this.formValue.controls["phoneNumber"].setValue(row.phoneNumber);
    this.formValue.controls["email"].setValue(row.email);
    this.formValue.controls["grade"].setValue(row.grade);
    this.formValue.controls["lastName"].setValue(row.lastName);
  }

  updateStudentDetails() {
    this.studentModelObj.firstName = this.formValue.value.firstName;
    this.studentModelObj.lastName = this.formValue.value.lastName;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.studentModelObj.grade = this.formValue.value.grade;

    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id)
    .subscribe(res => {
      // alert("Updated student details.")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllStudents();
    })
  }
}
