import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Quiz } from "../quizInterface/quiz";
import { Question } from "../../interfaces/question";
import { Button } from "react-bootstrap";

export function MultipleChoice({
    question,
    points,
    setPoints
}: {
    question: Question;
    points: number[];
    setPoints: (newPoints: number[]) => void;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    function updateAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        if (question.expected === event.target.value) {
            points.splice(question.id, 1, question.points);
            setPoints([...points]);
        } else {
            points.splice(question.id, 1, 0);
            setPoints([...points]);
        }
        setAnswer(event.target.value);
    }

    return (
        <div>
            <hr></hr>
            <h5>{question.name}</h5>
            {question.body}
            {question.options.map(
                (option: string): JSX.Element => (
                    <Form.Check
                        key={question.id.toString() + option}
                        type="radio"
                        onChange={updateAnswer}
                        label={option}
                        value={option}
                        id={question.id.toString()}
                        checked={answer === option}
                    />
                )
            )}
            <p></p>
            Your answer is:
            {question.expected === answer ? <p>Correct</p> : <p>Incorrect</p>}
            Points: {question.points}
        </div>
    );
}

export function ShortAnswer({
    question,
    points,
    setPoints
}: {
    question: Question;
    points: number[];
    setPoints: (newPoints: number[]) => void;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    function updateAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        if (question.expected === event.target.value) {
            points.splice(question.id, 1, question.points);
            setPoints([...points]);
        } else {
            points.splice(question.id, 1, 0);
            setPoints([...points]);
        }
        setAnswer(event.target.value);
    }

    return (
        <div>
            <hr></hr>
            <h5>{question.name}</h5>
            {question.body}
            <Form.Control
                key={question.id.toString()}
                value={answer}
                onChange={updateAnswer}
                id={question.id.toString()}
            />
            <p></p>
            Your answer is:
            {question.expected === answer ? <p>Correct</p> : <p>Incorrect</p>}
            Points: {question.points}
        </div>
    );
}

export function TakeQuiz({
    takeQuiz,
    setView
}: {
    takeQuiz: Quiz;
    setView: (newView: number) => void;
}): JSX.Element {
    const POINTS = new Array(takeQuiz.questions.length).fill(0);
    const [points, setPoints] = useState<number[]>(POINTS);
    const [publishedView, setPublishedView] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(true);
    function updatePublishedView(event: React.ChangeEvent<HTMLInputElement>) {
        setPublishedView(event.target.checked);
        setPoints(POINTS);
    }
    function updateReset() {
        setReset(!reset);
        setPoints(POINTS);
    }
    return (
        <div>
            <h4>{takeQuiz.title}</h4>
            <Form.Check
                type="switch"
                id="is-publishes-view"
                label="Only published questions"
                checked={publishedView}
                onChange={updatePublishedView}
            />
            {reset &&
                publishedView === false &&
                takeQuiz.questions.map(
                    (question: Question): JSX.Element =>
                        question.type === "multiple_choice_question" ? (
                            <MultipleChoice
                                question={question}
                                points={points}
                                setPoints={setPoints}
                            ></MultipleChoice>
                        ) : (
                            <ShortAnswer
                                question={question}
                                points={points}
                                setPoints={setPoints}
                            ></ShortAnswer>
                        )
                )}
            {!reset &&
                publishedView === false &&
                takeQuiz.questions.map(
                    (question: Question): JSX.Element =>
                        question.type === "multiple_choice_question" ? (
                            <MultipleChoice
                                question={question}
                                points={points}
                                setPoints={setPoints}
                            ></MultipleChoice>
                        ) : (
                            <ShortAnswer
                                question={question}
                                points={points}
                                setPoints={setPoints}
                            ></ShortAnswer>
                        )
                )}
            {reset &&
                publishedView === true &&
                takeQuiz.questions
                    .filter((q: Question): boolean => q.published === true)
                    .map(
                        (question: Question): JSX.Element =>
                            question.type === "multiple_choice_question" ? (
                                <MultipleChoice
                                    question={question}
                                    points={points}
                                    setPoints={setPoints}
                                ></MultipleChoice>
                            ) : (
                                <ShortAnswer
                                    question={question}
                                    points={points}
                                    setPoints={setPoints}
                                ></ShortAnswer>
                            )
                    )}
            {!reset &&
                publishedView === true &&
                takeQuiz.questions
                    .filter((q: Question): boolean => q.published === true)
                    .map(
                        (question: Question): JSX.Element =>
                            question.type === "multiple_choice_question" ? (
                                <MultipleChoice
                                    question={question}
                                    points={points}
                                    setPoints={setPoints}
                                ></MultipleChoice>
                            ) : (
                                <ShortAnswer
                                    question={question}
                                    points={points}
                                    setPoints={setPoints}
                                ></ShortAnswer>
                            )
                    )}
            <hr></hr>
            You received{" "}
            {points.reduce(
                (currentTotal: number, num: number) => currentTotal + num,
                0
            )}{" "}
            points
            <p></p>
            <Button onClick={updateReset}>Reset</Button>
            <p></p>
            <Button onClick={() => setView(0)}>Exit</Button>
        </div>
    );
}
