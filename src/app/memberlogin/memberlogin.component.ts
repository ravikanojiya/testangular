import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-memberlogin',
  templateUrl: './memberlogin.component.html',
  styleUrls: ['./memberlogin.component.scss'],
})
export class MemberloginComponent implements OnInit {
  loginForm: FormGroup;
  loginresp:any;
  constructor(private ds: DataService,private route:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  saveData() {
    var body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.ds.createMember1(body).subscribe((res) => {
      console.log(res, 'login');
      this.loginresp=res;
      if(this.loginresp.issuccess==true){
        localStorage.setItem('token',this.loginresp.token)
        localStorage.setItem('uname',this.loginresp.name)
        this.route.navigate(['/dashboard'])
      }
    },(err)=>[
      alert(err.message)
    ]);
  }
}
