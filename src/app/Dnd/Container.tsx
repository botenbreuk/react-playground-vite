import { useState } from 'react';
import Question from './Question';
import QuestionList, { BoxType } from './QuestionList';
import { QuestionTypes } from './QuestionTypes';

export default function Container() {
  const [questions, setQuestions] = useState<BoxType[]>([]);

  function addTotList(name: string) {
    const copy = [...questions];
    const id = copy.length ? copy.length + 1 : 0;
    copy.push({
      type: QuestionTypes.NEW_QUESTION,
      name,
      id,
      index: questions.length + 1
    });
    setQuestions(copy);
  }

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Question key="Glass" name="Glass" onClick={addTotList} />
        <Question key="Banana" name="Banana" onClick={addTotList} />
        <Question key="Paper" name="Paper" onClick={addTotList} />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <QuestionList value={questions} onChange={setQuestions} />
      </div>
    </div>
  );
}
