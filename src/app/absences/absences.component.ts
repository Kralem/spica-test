import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss'],
})
export class AbsencesComponent implements OnInit {
  public absence: Absence[] = [];
  public users: User[] = [];
  public joined: Joined[] = [];

  constructor(private http: HttpClient, public formbuilder: FormBuilder) {}

  public forma = this.formbuilder.group({
    datumOD: '',
    datumDO: '',
  });

  validateDate(datuminput: string): boolean {
    return /^\d{4,}-\d{1,2}-\d{1,2}$/.test(datuminput); // => true/false
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (
      this.validateDate(this.forma.value.datumOD) == false ||
      this.validateDate(this.forma.value.datumDO) == false
    ) {
      return console.log('error');
    }

    let token = localStorage.getItem('currentUser');
    if (token == null) {
      console.log('error');
      return;
    }
    let string_url = 'https://api4.allhours.com/api/v1/Absences';
    let string_url2 = 'https://api4.allhours.com/api/v1/Users';
    token = JSON.parse(token).access_token as string;
    console.log(token);
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      authorization: token,
    });

    let ood = this.forma.value.datumOD + 'T00:00';
    let doo = this.forma.value.datumDO + 'T23:59';
    console.log(ood);

    let params = new HttpParams().set('dateFrom', ood);
    params.set('dateTo', doo);
    let options1 = { headers, params };
    let options2 = { headers };
    this.http
      .get<any>(string_url, options1)
      .subscribe((x) => (this.absence = x));
    this.http
      .get<any>(string_url2, options2)
      .subscribe((x) => (this.users = x));

    for (var val of this.absence) {
      for (var val2 of this.users) {
        if (val2.Id == val.UserId) {
          this.joined.push({
            FirstName: val2.FirstName,
            Timestamp: val.Timestamp,
            Comment: val.Comment,
          });
        }
      }
    }
  }
}

class Absence {
  UserId?: string;
  Timestamp?: string;
  Comment?: string;
}

class User {
  Id?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
}

class Joined {
  FirstName?: string;
  Timestamp?: string;
  Comment?: string;
}
