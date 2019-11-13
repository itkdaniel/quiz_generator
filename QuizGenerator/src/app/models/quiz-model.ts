export interface Question {
  question: string;
  options: string [];
  answer: number;
}

export interface QuizModel {
  category: string;
  questions: Question[];
}
