import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../services/quiz-service.service';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
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
    ]),
    trigger('slide', [
      state('out', style({transform: 'translateX(100%)', opacity: 0})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
      ]),
      transition('* => out', animate('200ms ease-in'))
    ])
  ]
})
export class HomePageComponent implements OnInit {
  shake: string;
  slide: string;
  isShow = true;
  categories: any;
  category = 'Select a category';
  constructor(private fb: FormBuilder, private quiz: QuizServiceService, private route: Router) {
      this.quiz.getCategories().subscribe(obj => {
      this.categories = obj;
    });
  }

  categoryForm = this.fb.group({
    choose : ['Select a category', Validators.required]
  });

  setToDefault() {
    this.shake = '*';
  }

  onSubmit() {
    console.log('chosen: ' + this.category);
    console.log('shake: ' + this.shake);
    console.log('isShow: ' + this.isShow);
    if (this.isShow == true && this.category === 'Select a category') {
      this.isShow = false;
      this.shake = 'invalid';
      console.log('shake: ' + this.shake);
    } else if (this.isShow == true && this.category !== 'Select a category') {
      this.isShow = true;
      this.slide = 'out';
      setTimeout( () => {
        this.route.navigate(['quiz/', this.category]);
      }, 225);
    } else if (this.isShow == false && this.category !== 'Select a category') {
      this.isShow = true;
      this.slide = 'out';
      setTimeout( () => {
        this.route.navigate(['quiz/', this.category]);
      }, 225);
    } else if (this.isShow == false && this.category === 'Select a category' && this.shake === '*') {
      console.log('turning shake to invalid');
      this.shake = 'invalid';
    }
  }

  get choose() { return this.categoryForm.get('choose'); }
  ngOnInit() {

  }

}

