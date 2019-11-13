import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations : [
    trigger('fade', [
      state('submitted', style({opacity : 1})),
      state('init', style({opacity: 0})),
      transition('* => init', [
        // style({opacity: 0}),
        animate('750ms cubic-bezier(.61, .26, .41, .83)')
      ]),
      transition('void => *', [
        style({opacity: 0}),
        animate('750ms cubic-bezier(.61, .26, .41, .83)')
      ]),
    ]),
    trigger('shake', [
      state('invalid', style({})),
      transition('* => invalid', animate(500, keyframes([
        style({transform: 'translateY(-10%)'}),
        style({transform: 'translateY(10%)'}),
        style({transform: 'translateY(-10%)'}),
        style({transform: 'translateY(10%)'}),
        style({transform: 'translateY(-10%)'}),
        style({transform: 'translateY(10%)'}),
        style({transform: 'translateY(-10%)'}),
        style({transform: 'translateY(10%)'}),
        style({transform: 'translateY(-10%)'}),
        style({transform: 'translateY(10%)'}),

      ])))
    ])
  ]
})
export class LoginPageComponent implements OnInit {
  users: any;
  loggedin_user: any;
  show = false;
  showPasswordError = false;
  showLoginError = false;
  fade: string;
  shake: string;
  exists: any;

  constructor(private fb: FormBuilder, private route: Router, public user: LoginServiceService) {
    // this.loginFadeAnimation = 'onLoad';

    // this.user.getusers().subscribe(data => this.users = data);
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  setToDefault() {
    this.shake = '*';
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    console.log(this.username.value);
    // console.log(this.users);

    let username1 = this.username.value;
    let password1 = this.password.value;

    let users = this.users;


    // make http request to validate user
    if ((username1 !== '' || username1 !== null) && (password1 !== '' || password1 !== null)) {
      this.exists = this.user.validateUser(username1, password1).subscribe(data => {
        this.exists = data.exists;
        console.log(typeof this.exists);

        if (this.exists === true) {
          console.log('exists is: ' + this.exists);
          this.user.loggedInUser = username1;
          this.fade = 'init';
          setTimeout( () => {
            this.route.navigate(['home']);
          }, 750);
        } else if (this.username.valid && this.password.valid && (this.user.loggedInUser == null || this.user.loggedInUser == '')) {
          this.showLoginError = false;
          this.showPasswordError = false;
          this.show = true;
          this.shake = 'invalid';
        } else if (this.username.valid && this.password.invalid) {
          this.show = false;
          this.showLoginError = false;
          this.showPasswordError = true;
          this.shake = 'invalid';
        } else if (this.username.invalid && this.password.invalid) {
          this.show = false;
          this.showPasswordError = false;
          this.showLoginError =  true;
          this.shake = 'invalid';
        }
      });
      // console.log("Exists: " + this.exists);
    }

    // users.forEach(user => {
    //   if (user.username == username1 && user.password == password1) {
    //     this.user.loggedInUser = this.username.value;
    //     // this.wait(2000);
    //     this.fade = 'init';
    //     setTimeout( () => {
    //       this.route.navigate(['home']);
    //     }, 750);
    //     // this.route.navigate(['home']);
    //   }
    // });
    // if (this.exists === true) {
    //   console.log("exists is: " + this.exists);
    //   this.user.loggedInUser = this.username.value;
    //   this.fade = 'init';
    //   setTimeout( () => {
    //     this.route.navigate(['home']);
    //   }, 750);
    //   // this.route.navigate(['home']);
    // } else if (this.username.valid && this.password.valid && (this.user.loggedInUser == null || this.user.loggedInUser == '')) {
    //   this.showLoginError = false;
    //   this.showPasswordError = false;
    //   this.show = true;
    //   this.shake = 'invalid';
    // } else if (this.username.valid && this.password.invalid) {
    //   this.show = false;
    //   this.showLoginError = false;
    //   this.showPasswordError = true;
    //   this.shake = 'invalid';
    // } else if (this.username.invalid && this.password.invalid) {
    //   this.show = false;
    //   this.showPasswordError = false;
    //   this.showLoginError =  true;
    //   this.shake = 'invalid';
    // }
  }

  ngOnInit() {
    // this.loginFadeAnimation = 'onLoad';
  }

}
