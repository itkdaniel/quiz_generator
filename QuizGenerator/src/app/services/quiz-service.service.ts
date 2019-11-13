import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Observable, throwError } from 'rxjs';
import { QuizModel } from '../models/quiz-model';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { catchError } from 'rxjs/operators';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  // questions: any;
  // categories: any;
  // allQuestionsUrl = 'https://opentdb.com/api.php?amount=10';

  resultCorrect: string;
  resultIncorrect: string;
  data: any;
  constructor(private http: HttpClient, private loginService: LoginServiceService,
              @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  saveInSession(correct: string, incorrect: string): void {
    console.log('recieved= key: ' + 1 + 'value: ' + correct);
    console.log('recieved= key: ' + 0  + 'value: ' + incorrect);

    this.storage.set('0', incorrect);
    // this.data[0] = incorrect;
    this.storage.set('1', correct);
    // this.data[1] = correct;
   }
  
  getFromSession(key) {
    var intVal = parseInt(key, 10);
    console.log('recieved= key:' + key);
    console.log("value of key: " + this.storage.get(key));
    // this.data[intVal] = this.storage.get(key);
    // console.log(this.data);
    return this.storage.get(key);
   }

  // post: {category: category}
  getQuestions(category: string) {
    // const urlCategory = '../assets/' + category + '.json';
    // const categoryEndPoint = 'http://localhost:3000/api/categories/' + category;
    const user = this.loginService.loggedInUser;
    const userCategoryEndPoint = 'http://localhost:3000/api/user/' + user + '/category/' + category;

    return this.http.get<QuizModel>(userCategoryEndPoint);
  }

  getCategories() {
    // const url = '../assets/categories.json';
    return this.http.get("http://localhost:3000/api/categories");
    // console.log("went to /api/users");
    // return this.http.get(url);
  }

  getResult(userAnswers: number[], category: string) {
    const resultEndpoint = `http://localhost:3000/api/results?category=${category}`;
    console.log(`Going to endpoint: ${resultEndpoint}`);
    return this.http.post<any>(resultEndpoint, userAnswers);
  }

}
