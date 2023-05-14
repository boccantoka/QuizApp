import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { Answer } from '../../services/quiz';

export interface AnswersContextValue {
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
  answers: Answer[];
}

const defaultState = {
  answers: [],
  setAnswers: () => {},
} as AnswersContextValue;

export const AnswerContext = createContext<AnswersContextValue>(defaultState);

interface AnswersProviderProps {
  children: ReactNode;
}

export const AnswersProvider = ({ children }: AnswersProviderProps) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const contextValue = useMemo(
    () => ({
      answers,
      setAnswers,
    }),
    [answers, setAnswers]
  );

  return (
    <AnswerContext.Provider value={contextValue}>
      {children}
    </AnswerContext.Provider>
  );
};
