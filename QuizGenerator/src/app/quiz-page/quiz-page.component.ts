import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras} from '@angular/router';
import { QuizServiceService } from '../services/quiz-service.service';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { QuizModel, Question } from '../models/quiz-model';
import { map, flatMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
  animations: [
    trigger('slide', [
      // state('left', style({ transform: 'translateX(50%)' })),
      // state('right', style({ transform: 'translateX(-50%)' })),
      // transition('void => *', animate(300))
      state('out', style({transform: 'translateY(150%)', opacity: 0})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
      ]),
      transition('* => out', animate('200ms ease-in'))
    ])
  ]
})
export class QuizPageComponent implements OnInit {
  slide: string;
  correct = 0;
  incorrect = 0;
  category: string;
  quizForm: FormGroup;
  error = '';
  quiz: QuizModel = {
    category: '',
    questions: []
  };

  constructor(private fb: FormBuilder, private route: Router, private activeRoute: ActivatedRoute,
              private quizService: QuizServiceService, private login: LoginServiceService) {
    if (this.login.getLoggedInUser() == "") {
      console.log("data: " + this.login.getLoggedInUser());
      route.navigate(['/login']);
    } else {
      this.activeRoute.paramMap.subscribe(params => this.category = params.get('category'));
      console.log(this.category);
      this.activeRoute.paramMap.pipe(
        map(params => params.get('category')),
        flatMap(category => this.quizService.getQuestions(category))
      ).subscribe(data => {
        this.quiz = data;
        console.log("quiz questions: " + this.quiz.questions);
        for (let i = 0; i < this.quiz.questions.length; i++) {
          this.quizAnswers.push(new FormControl ('', Validators.required));
        }
      });
    }

  }


  getAnswers() {
    var correctAnswers = new Array(this.quiz.questions.length);
    for (let i = 0; i < this.quiz.questions.length; i++) {
      correctAnswers[i] = this.quiz.questions[i].answer;
    }
    return correctAnswers;
  }

  compareAnswers() {

    var correctAnswers = this.getAnswers();

    for (let i = 0; i < this.quiz.questions.length; i++) {
      if (this.userAnswers[i] == correctAnswers[i]) {
        this.correct++;
      } else {
        console.log("quizAnswer vs userAnswer: " +  correctAnswers[i]  + ', ' + this.userAnswers[i]);
        // console.log("this.userAnswer: " + this.userAnswers[i]);
        this.incorrect++;
      }
    }
  }




  get quizAnswers(): FormArray {
    return this.quizForm.get('answers') as FormArray;
  }

  get quizQuestions(): Question[] {
    return this.quiz.questions;
  }

  get userAnswers(): number[] {
    return this.quizForm.value.answers;
  }

  onSubmit() {
    console.log(this.quizForm);
    console.log(this.quizForm.valid);


    if (this.quizForm.invalid) {
      alert('Please fill out all questions');
    } else {
      this.quizService.getResult(this.userAnswers, this.category).subscribe(data => {
        console.log(data);
        console.log('correct from component: ' + data.correct + ', type: ' + typeof data.correct);
        console.log('incorrect : ' + data.incorrect + ', type: ' + typeof data.incorrect);
        this.correct = data.correct;
        this.incorrect = data.incorrect;
        this.quizService.saveInSession(this.correct.toString(), this.incorrect.toString());
        this.slide = 'out';
        setTimeout( () => {
          this.route.navigate(['results']);
        }, 225);
      });
    }
  }

  get answers(): number[] {
    return this.quizForm.value.answers;
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      answers: new FormArray([])
    });
  }
}
