import { Category } from './category';
import { Question } from './question';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Array<Question>;
  categoryId?: string;
  category?: Category;
}
