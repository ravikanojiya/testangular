import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import "rxjs/add/operator/map";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  // getLogin(id): Observable<any> {
  //   return this.http.post(`${environment.Base_Url}ADA2021/mst_MemberMaster_list/`, id);
  // }

  createMember(body: any): Observable<any[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODI1MDk4MjUwIiwiTmFtZSI6Iktpc2hhbiBQYXJtYXIiLCJNb2JpbGUiOiI5ODI1MDk4MjUwIiwiVXNlck5hbWUiOiI5ODI1MDk4MjUwIiwiSUQiOiIxIiwiUm9sZSI6IlVzZXIiLCJEYXRlT2ZKb2luZyI6IjIwMjEtMDgtMjUiLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGF0aWVudCIsImV4cCI6MTY2MTQzMzI4NiwiaXNzIjoicngxMDguaW4iLCJhdWQiOiJyeDEwOC5pbiJ9.md1RIrzi4fyb-h7uXps7HzXIiuZeU2XMt0WTrEgcRFQ',
    });
    let options = { headers: headers };
    return this.http
      .post<any[]>(
        environment.Base_Url + `ADA2021/mst_MemberMaster_list/memNo='${body}'`,
        '',
        {
          headers: headers,
        }
      )
      .pipe(map((res: any) => res));
  }

  createMember1(body: any): Observable<any[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http
      .post<any[]>(environment.Base_Url + `Account/login`, body, {
        headers: headers,
      })
      .pipe(map((res: any) => res));
  }
  // loginMember(body): Observable<any> {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization':
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODI1MDk4MjUwIiwiTmFtZSI6Iktpc2hhbiBQYXJtYXIiLCJNb2JpbGUiOiI5ODI1MDk4MjUwIiwiVXNlck5hbWUiOiI5ODI1MDk4MjUwIiwiSUQiOiIxIiwiUm9sZSI6IlVzZXIiLCJEYXRlT2ZKb2luZyI6IjIwMjEtMDgtMjUiLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGF0aWVudCIsImV4cCI6MTY2MTQzMzI4NiwiaXNzIjoicngxMDguaW4iLCJhdWQiOiJyeDEwOC5pbiJ9.md1RIrzi4fyb-h7uXps7HzXIiuZeU2XMt0WTrEgcRFQ',
  //   });
  //   let options = { headers: headers };
  //   return this.http.post(`${environment.Base_Url}Account/login`, body);
  // }
  getPerticular(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODI1MDk4MjUwIiwiTmFtZSI6Iktpc2hhbiBQYXJtYXIiLCJNb2JpbGUiOiI5ODI1MDk4MjUwIiwiVXNlck5hbWUiOiI5ODI1MDk4MjUwIiwiSUQiOiIxIiwiUm9sZSI6IlVzZXIiLCJEYXRlT2ZKb2luZyI6IjIwMjEtMDgtMjUiLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGF0aWVudCIsImV4cCI6MTY2MTQzMzI4NiwiaXNzIjoicngxMDguaW4iLCJhdWQiOiJyeDEwOC5pbiJ9.md1RIrzi4fyb-h7uXps7HzXIiuZeU2XMt0WTrEgcRFQ',
    });
    let options = { headers: headers };
    return this.http
      .get<any[]>(environment.Base_Url + 'ADA2021/mst_FeesMaster_list', {
        headers: headers,
      })
      .pipe(map((res: any) => res));
  }

  getPerticularById(id:any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODI1MDk4MjUwIiwiTmFtZSI6Iktpc2hhbiBQYXJtYXIiLCJNb2JpbGUiOiI5ODI1MDk4MjUwIiwiVXNlck5hbWUiOiI5ODI1MDk4MjUwIiwiSUQiOiIxIiwiUm9sZSI6IlVzZXIiLCJEYXRlT2ZKb2luZyI6IjIwMjEtMDgtMjUiLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGF0aWVudCIsImV4cCI6MTY2MTQzMzI4NiwiaXNzIjoicngxMDguaW4iLCJhdWQiOiJyeDEwOC5pbiJ9.md1RIrzi4fyb-h7uXps7HzXIiuZeU2XMt0WTrEgcRFQ',
    });
    let options = { headers: headers };
    return this.http
      .get<any[]>(environment.Base_Url + 'ADA2021/mst_FeesMaster_BySrNo/'+id, {
        headers: headers,
      })
      .pipe(map((res: any) => res));
  }

  getBillList(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODI1MDk4MjUwIiwiTmFtZSI6Iktpc2hhbiBQYXJtYXIiLCJNb2JpbGUiOiI5ODI1MDk4MjUwIiwiVXNlck5hbWUiOiI5ODI1MDk4MjUwIiwiSUQiOiIxIiwiUm9sZSI6IlVzZXIiLCJEYXRlT2ZKb2luZyI6IjIwMjEtMDgtMjUiLCJqdGkiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGF0aWVudCIsImV4cCI6MTY2MTQzMzI4NiwiaXNzIjoicngxMDguaW4iLCJhdWQiOiJyeDEwOC5pbiJ9.md1RIrzi4fyb-h7uXps7HzXIiuZeU2XMt0WTrEgcRFQ',
    });
    let options = { headers: headers };
    return this.http
      .get<any[]>(environment.Base_Url + 'ADA2021/GetBill', {
        headers: headers,
      })
      .pipe(map((res: any) => res));
  }
}
