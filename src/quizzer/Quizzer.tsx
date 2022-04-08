import React, { useState } from "react";
import quizData from "./Quizzes/quizzesData.json";
import { Quiz } from "./quizInterface/quiz";
import { Question, QuestionType } from "../interfaces/question";
import Form from "react-bootstrap/Form";
import { TakeQuiz } from "./QuizComponents/takeQuiz";
import { Button } from "react-bootstrap";
import { EditQuiz } from "./QuizComponents/editQuiz";
import { NewQuiz } from "./QuizComponents/newQuiz";
import { Container, Row, Col } from "react-bootstrap";
import sketch from "./sketch.jpg";

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
                            <option
                                key={q.id.toString() + "-quiz"}
                                value={q.id}
                                data-testid={q.id.toString() + "-quiz"}
                            >
                                {q.title}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <p></p>
            Description: {qList.length !== 0 && qList[quizChosen].description}
            <p></p>
            The quiz has{" "}
            {qList.length !== 0 && qList[quizChosen].questions.length}
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
                <Button
                    onClick={() => setView(1)}
                    disabled={quizzes.length === 0}
                    data-testid="takeQuiz-button"
                >
                    Take Quiz
                </Button>
            )}
            {view === 0 && (
                <Button
                    onClick={() => setView(2)}
                    disabled={quizzes.length === 0}
                    data-testid="editQuiz-button"
                >
                    Edit Quiz
                </Button>
            )}
            {view === 0 && <p>Create a new Quiz:</p>}
            {view === 0 && <Button onClick={() => setView(3)}>New Quiz</Button>}
            {view === 1 && (
                <TakeQuiz takeQuiz={quizzes[quizChosen]} setView={setView} />
            )}
            {view === 2 && (
                <EditQuiz
                    editQ={quizzes[quizChosen]}
                    quizzes={quizzes}
                    index={quizChosen}
                    setQuizzes={setQuizzes}
                    setQuiz={setQuiz}
                    setView={setView}
                />
            )}
            {view === 3 && (
                <NewQuiz
                    quizzes={quizzes}
                    setQuizzes={setQuizzes}
                    setQuiz={setQuiz}
                    setView={setView}
                />
            )}
            <hr></hr>
            <h4>Checklist and Sketch</h4>
            <Container>
                <Row>
                    <Col>
                        <ul>
                            <li>Users can see quizzes: Done </li>
                            <li>Users can select specific quiz: Done </li>
                            <li>
                                Questions in quiz can be of at least two types:
                                Done
                            </li>
                            <li>
                                Users enter or choose an answer for a quiz
                                question and are told if they are correct: Done
                            </li>
                            <li>Users see total points: Done</li>
                            <li>Users can clear out answers: Done</li>
                            <li>
                                Users can publish or unpulish a question: Done
                            </li>
                            <li>
                                Users can filter the questions based on the
                                published status: Done
                            </li>
                            <li>Users can edit the questions: Done</li>
                            <li>Users can add a new quiz question: Done</li>
                            <li>
                                Users can delete an existing quiz question: Done
                            </li>
                            <li>Users can reorder quiz questions: Done</li>
                            <li>Users can add a new quiz: Done</li>
                            <li>Useers can delete an existing quiz: Done</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <img src={sketch} alt="Sketch" />
        </div>
    );
}
