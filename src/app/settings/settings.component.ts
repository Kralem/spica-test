import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public forma = this.formBuilder.group({
    client_id: '',
    client_secret: '',
  });

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    //procesiramo podatke
    console.log('Your secret has been submitted', this.forma.value);
    this.login(this.forma.value.client_id, this.forma.value.client_secret);
    this.forma.reset();
    const token = localStorage.getItem('currentUser');
  }

  login(client_id: string, client_secret: string) {
    //http request ni delal, sem ga naredil ročno z javascriptom
    var url = 'https://login.allhours.com/connect/token';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        localStorage.setItem('currentUser', xhr.responseText);
        console.log(localStorage.getItem('currentUser'));
      }
    };

    var data =
      'grant_type=client_credentials&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret +
      '&scope=api';

    xhr.send(data);
  }
}

export class User {
  client_id: string = '';
  client_secret: string = '';
}
