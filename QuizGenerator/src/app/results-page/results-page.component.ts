import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { FormBuilder } from '@angular/forms';
import { QuizServiceService } from '../services/quiz-service.service';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css'],
  animations: [
    trigger('pulse', [
      transition('void => *', [
        animate(
          '400ms cubic-bezier(.11,.99,.83,.43)',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.5)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class ResultsPageComponent implements OnInit {
  loggedin_user: any;
  pulse: string;
  score: number;
  correct: string;
  incorrect: string;
  loginForm: any;

  constructor(private fb: FormBuilder, private route: Router , private activeRoute: ActivatedRoute,
              private quizService: QuizServiceService,  public user: LoginServiceService) {

    // this.correct = this.quizService.getFromSession('1');
    // this.incorrect = this.quizService.getFromSession('0');

    // this.activeRoute.paramMap.subscribe(params => this.correct = params.get('correct'));
    // this.activeRoute.paramMap.subscribe(params => this.incorrect = params.get('incorrect'));
  }


  logout() {
    this.user.setusernull();
    this.route.navigate(['login']);
  }

  again() {
    this.route.navigate(['home']);
  }

  ngOnInit() {
    this.correct = this.quizService.getFromSession('1');
    this.incorrect = this.quizService.getFromSession('0');
  }

}
