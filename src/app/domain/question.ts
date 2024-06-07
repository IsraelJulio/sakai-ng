export interface Question {
  id: number;
  front: string;
  back: string;
  rate: number;
  quizId: number;
  rightQuestions: number;
  wrongQuestions: number;
}
