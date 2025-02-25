import { useState } from "react";
import { questions } from "../data/questions";
import Button from "./common/Button";
import { toast } from "react-toastify";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //예외처리: 아무 답변도 하지 않거나 빼먹었고 확인버튼 누를 떄
    const isBlank = answers.some((answer) => !answer.answer);
    if (isBlank) {
      toast.warn("테스트를 모두 완료해주세요!");
      return;
    }

    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <p className="font-medium text-base lg:text-lg mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`text-sm block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                  answers[index]?.answer === option ? "bg-indigo-200" : ""
                } hover:bg-indigo-200`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index]?.answer === option}
                  onChange={() => handleChange(index, option)}
                  className="mr-2 text-primary-color"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Button className="self-center" type="submit">
          제출하기
        </Button>
      </div>
    </form>
  );
};

export default TestForm;
