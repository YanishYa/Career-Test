import { Observable } from 'rxjs';
import { QuestionPagination } from './../models/question.model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { map } from 'rxjs/operators';
import { Observer, of } from 'rxjs';
import { TestResult } from '../models/test-result.model';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  QUESTION_KEY = 'question-key';

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public loadQuestions(pageSize: number): Observable<QuestionPagination> {
    return this.http.get<Question[]>(this.baseUrl + 'questions').pipe(
      map((x) => {
        x.forEach((q) => {
          q.options.forEach((o) => {
            o.name = o.name.charAt(0).toUpperCase() + o.name.slice(1);
          });
        });
        return x;
      })
    ).pipe(map((x) => {
      return new QuestionPagination(x[0], pageSize);
    }));
  }

  public loadResults() {
    return this.http.get<any[]>(this.baseUrl + 'results');
  }

  public saveResultToLS(data: TestResult) {
    if (data) {
      localStorage.setItem(this.QUESTION_KEY, JSON.stringify(data));
    }
  }

  public getResultFromLS(): TestResult {
    return JSON.parse(localStorage.getItem(this.QUESTION_KEY) || (null as any));
  }

  public cleanResults() {
    localStorage.removeItem(this.QUESTION_KEY);
  }

  public saveAnswers(answers: Answer[]) {
    return this.http.post(this.baseUrl + 'answer', answers)
  }
}
