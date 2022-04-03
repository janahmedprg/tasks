import React, { useState } from "react";
import quizData from "./Quizzes/quizzesData.json";
import { Quiz } from "./quizInterface/quiz";
import { Question, QuestionType } from "../interfaces/question";
import Form from "react-bootstrap/Form";
import { TakeQuiz } from "./QuizComponents/takeQuiz";
import { Button } from "react-bootstrap";
import { EditQuiz } from "./QuizComponents/editQuiz";
import { NewQuiz } from "./QuizComponents/newQuiz";

const QUIZ_DATA: Quiz[] = quizData.map(
    (q): Quiz => ({
        ...q,
        questions: q.questions.map(
            (que): Question => ({
                ...que,
                type: que.type as QuestionType
            })
        )
    })
);

export function QuizList({
    qList,
    quizChosen,
    setQuiz
}: {
    qList: Quiz[];
    quizChosen: number;
    setQuiz: (newQuiz: number) => void;
}): JSX.Element {
    function updateQuiz(event: React.ChangeEvent<HTMLSelectElement>) {
        setQuiz(parseInt(event.target.value));
    }

    return (
        <div>
            <Form.Group controlId="quizChooser">
                <h4>Select a Quiz:</h4>
                <Form.Select value={quizChosen} onChange={updateQuiz}>
                    {qList.map(
                        (q: Quiz): JSX.Element => (
                            <option key={q.id} value={q.id}>
                                {q.title}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <p></p>
            Description: {qList[quizChosen].description}
            <p></p>
            The quiz has {qList[quizChosen].questions.length}
        </div>
    );
}

export function Quizzer(): JSX.Element {
    const [quizzes, setQuizzes] = useState<Quiz[]>(QUIZ_DATA);
    const [view, setView] = useState<number>(0);
    const [quizChosen, setQuiz] = useState<number>(quizData[0].id);
    return (
        <div>
            <h3>Quizzer</h3>
            <hr></hr>
            {view === 0 && (
                <QuizList
                    qList={quizzes}
                    quizChosen={quizChosen}
                    setQuiz={setQuiz}
                />
            )}
            <p></p>
            {view === 0 && (
                <Button onClick={() => setView(1)}>Take Quiz</Button>
            )}
            {view === 0 && (
                <Button onClick={() => setView(2)}>Edit Quiz</Button>
            )}
            {view === 0 && <p>Create a new Quiz:</p>}
            {view === 0 && <Button onClick={() => setView(3)}>New Quiz</Button>}
            {view === 1 && (
                <TakeQuiz takeQuiz={quizzes[quizChosen]} setView={setView} />
            )}
            {view === 2 && (
                <EditQuiz editQuiz={quizzes[quizChosen]} setView={setView} />
            )}
            {view === 3 && (
                <NewQuiz setQuizzes={setQuizzes} setView={setView} />
            )}
        </div>
    );
}
