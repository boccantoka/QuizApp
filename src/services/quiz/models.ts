export interface QuizApiQuestionEndpointResponse {
  results: Question[];
  response_code: number;
}

export interface QuizApiTokenEndpointResponse {
  response_code: number;
  token: string;
}

export type Question = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  type: string;
  question: string;
};

export type Answer = {
  isCorrect: boolean;
  question: string;
};

export enum QuestionType {
  Multiple = 'multiple',
  Boolean = 'boolean',
}

export enum QuestionDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}
