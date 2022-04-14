import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private http: HttpClient, public formbuilder: FormBuilder) {}

  public forma = this.formbuilder.group({
    searchTerm: '',
  });

  ngOnInit(): void {
    let token = localStorage.getItem('currentUser');
    if (token == null) {
      console.log('error');
      return;
    }
    let string_url = 'https://api4.allhours.com/api/v1/Users';
    token = JSON.parse(token).access_token as string;
    console.log(token);
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: token,
    });
    let options = { headers };
    this.http.get<any>(string_url, options).subscribe((x) => (this.users = x));
  }

  onSubmit(): void {
    let token = localStorage.getItem('currentUser');
    if (token == null) {
      console.log('error');
      return;
    }
    let string_url = 'https://api4.allhours.com/api/v1/Users/Query';
    token = JSON.parse(token).access_token as string;
    console.log(token);
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: token,
    });
    let params = new HttpParams().set(
      'searchTerm',
      this.forma.value.searchTerm
    );
    let options = { headers, params };
    console.log(this.forma.value.searchTerm);
    console.log(options);
    this.http.get<any>(string_url, options).subscribe((x) => (this.users = x));
  }
}

class User {
  FirstName?: string;
  LastName?: string;
  Email?: string;
}
