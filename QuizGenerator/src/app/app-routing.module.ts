import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path: 'login', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'quiz/:category', component: QuizPageComponent},
  {path: 'results', component: ResultsPageComponent},
  { path: '**', component: PageNotFoundComponent }
];
// /:correct/:incorrect
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
