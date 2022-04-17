import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(private http: HttpClient, public formbuilder: FormBuilder) {}

  public forma = this.formbuilder.group({
    FirstName: '',
    LastName: '',
    Email: '',
  });

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Your user has been submitted', this.forma.value);
    this.addUser(
      this.forma.value.FirstName,
      this.forma.value.LastName,
      this.forma.value.Email
    );
    this.forma.reset();
  }

  addUser(n: string, l: string, e: string) {
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
    const body = { FirstName: n, LastName: l, Email: e };
    let options = { headers };
    this.http
      .post<any>(string_url, body, options)
      .subscribe((x) => console.log(x));
  }
}
