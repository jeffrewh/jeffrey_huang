// src/components/Quiz.tsx
import React from "react";

// Define the structure of a Quiz question for strong typing
// This interface should ideally be shared or imported from a common types file
// but for now, we'll keep it here for direct use.
export interface QuizQuestion {
  question: string;
  options: string[]; // e.g., for multiple choice
  answer: string; // The correct answer text
  // type?: 'multiple-choice' | 'fill-in-the-blank'; // Future extensibility
}

// Define the props for the Quiz component
interface QuizProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string; // Unique ID for the quiz
  questions?: QuizQuestion[]; // Array of quiz questions
  // You might add more props here later, e.g., 'type' for different quiz formats
}

export const Quiz: React.FC<QuizProps> = ({ id, questions, ...rest }) => {
  return (
    <div className="p-4 bg-slate-700 rounded-md my-4" {...rest}>
      <h3 className="font-bold text-xl text-slate-200 mb-4">Quiz for {id}</h3>
      {questions && questions.length > 0 ? (
        <ol className="list-decimal list-inside pl-0">
          {questions.map((q: QuizQuestion, i: number) => (
            <li key={i} className="mb-4 text-lg text-slate-300">
              <p className="font-semibold mb-2">{q.question}</p>
              {q.options && q.options.length > 0 && (
                <ul className="list-inside list-alpha text-base text-slate-400 ml-4">
                  {q.options.map((option, idx) => (
                    <li key={idx}>
                      {String.fromCharCode(97 + idx)}. {option}
                    </li>
                  ))}
                </ul>
              )}
              {/* For now, just showing the question.
                  Future: Add interactive elements, check answers, show feedback. */}
              <p className="text-sm italic text-slate-500 mt-2">
                (Answer: {q.answer})
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-lg text-slate-400">
          No questions defined for this quiz.
        </p>
      )}
    </div>
  );
};
