import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  login(){
    const data = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    console.log(data)
    this.authService.sendLogin(data).subscribe(
      (resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.router.navigate(['chat'])
      },
      error => console.log(error)
    )
  }

}
