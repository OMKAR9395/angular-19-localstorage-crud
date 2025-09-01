import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule, NgIf,
    MatToolbarModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-19-localstorage-crud';
  isNewUser: boolean = true;
  userObj: User = new User();
  userList: User[] = [];
  states: string[] = ['Maharashtra', 'Goa', 'Tamil Nadu', 'Punjab'];


  snack = inject(MatSnackBar);

  ngOnInit(): void {
    const localData = localStorage.getItem('localUsers');
    try {
      const parsed = localData ? JSON.parse(localData) : [];
      this.userList = Array.isArray(parsed) ? parsed : [];
    } catch {
      this.userList = [];
    }
  }


  onEdit(data: User) {
    this.userObj = data;
    this.changeView();
  }
  onSave() {
    this.userObj.userId = (this.userList.at(-1)?.userId ?? 0) + 1;
    this.userList.push(this.userObj);
    this.userObj = new User();
    localStorage.setItem('localUsers', JSON.stringify(this.userList));
    this.snack.open('User added successfully', 'OK', { duration: 2000 });
    this.isNewUser = true;
  }
  changeView() {
    this.isNewUser = !this.isNewUser;
  }
  onUpdate() {
    const record = this.userList.find(m => m.userId == this.userObj.userId);
    if (record != undefined) {
      record.city = this.userObj.city;
      record.fName = this.userObj.fName;
      record.lName = this.userObj.lName;
      record.state = this.userObj.state;
      record.zipcode = this.userObj.zipcode;
    }
    localStorage.setItem('localUsers', JSON.stringify(this.userList));
    this.userObj = new User();

    this.snack.open('User updated', 'OK', { duration: 2000 });
    this.isNewUser = true;

  }
  onDelete(userId: number) {
    const isDelete = confirm("Are you want to sure Delete Record");
    if (isDelete) {
      const index = this.userList.findIndex(m => m.userId == userId)
      this.userList.splice(index, 1);
      localStorage.setItem('localUsers', JSON.stringify(this.userList));
      this.userObj = new User();
      this.snack.open('User deleted', 'OK', { duration: 2000 });
      this.isNewUser = true;

    }
  }
}

class User {
  userId: number;
  fName: string;
  lName: string;
  uName: string;
  city: string;
  zipcode: number;
  isAgree: boolean;
  state: string;

  constructor() {
    this.userId = 0;
    this.fName = "";
    this.lName = "";
    this.uName = "";
    this.city = "";
    this.zipcode = 0;
    this.isAgree = false;
    this.state = "";
  }
}